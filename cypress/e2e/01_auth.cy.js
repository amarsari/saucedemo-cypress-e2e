import LoginPage from '../support/pages/LoginPage';
import users from '../fixtures/users.json';

describe ('Saucedemo - Authentication Tests', () => {
    beforeEach(() =>{
        LoginPage.visit();
    });
    
    //Happy path: Valid username and password redirects to inventory.html
    it ('TC-AUtH-001: Successful login with valid credentials', () => {
        LoginPage.login(users.standardUser.username, users.standardUser.password);

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products');
    });

    //Sad path: Invalid credentials display proper error message
    it('TC-AUth-002: Failed login with invalid credentials', () =>{
        LoginPage.login(users.invalidUser.username, users.invalidUser.password);

        LoginPage.assertErrorMessage(users.invalidUser.errorMessage);
    });

    //Edge case scenario: Locked-out user displays proper error message
    it('TC-AUTH-003: Locked-out user with error message', () =>{
        LoginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

        LoginPage.assertErrorMessage(users.lockedOutUser.errorMessage);

    });
});
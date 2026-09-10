import LoginPage from '../support/pages/LoginPage';

describe ('Saucedemo - Authentication Tests', () => {
    beforeEach(() =>{
        LoginPage.visit();
    });
    
    //Happy path: Valid username and password redirects to inventory.html
    it ('TC-AUtH-001: Successful login with valid credentials', () => {
        LoginPage.login('standard_user', 'secret_sauce');

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products');
    });

    //Sad path: Invalid credentials display proper error message
    it('TC-AUth-002: Failed login with invalid credentials', () =>{
        LoginPage.login('invalid_user', 'invalid_password');

        LoginPage.assertErrorMessage(/username and password do not match/i);
    });

    //Edge case scenario: Locked-out user displays proper error message
    it('TC-AUTH-003: Locked-out user with error message', () =>{
        LoginPage.login('locked_out_user', 'secret_sauce');

        LoginPage.assertErrorMessage(/Epic sadface: Sorry, this user has been locked out./i);

    });
});
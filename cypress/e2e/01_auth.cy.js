describe ('Saucedemo - Authentication Tests', () => {
    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/');
    });
    
    //Happy path: Valid username and password redirects to inventory.html
    it ('TC-AUtH-001: Successful login with valid credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products');
    });

    //Sad path: Invalid credentials display proper error message
    it('TC-AUth-002: Failed login with invalid credentials', () =>{
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('wrong_password');
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and(($el) => {
                expect($el.text()).to.match(/username and password do not match/i);
            });
    });

    //Edge case scenario: Locked-out user displays proper error message
    it('TC-AUTH-003: Locked-out user with error message', () =>{
        cy.get('[data-test="username"]').type("locked_out_user");
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'locked out');
    });
});
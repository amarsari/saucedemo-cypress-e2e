describe('SauceDemo - Authentication and Form Validation', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('TC-AUTH-001: Should log in successfully with valid credentials', () => {
        //using data-test attributes for resilience
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Products');
    });

    it('TC-AUTH-002: Should fail to log in with invalid credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('wrong_password');
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'Username and password do not match');
    });

    it('TC-AUTH-003: Should display an error when fields are empty', () => {
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'Username is required');
    });
});
describe ('SauceDemo - Programmatic Session & Cart Injection', () =>{
    it('Bypasses UI login and loads inventory immediately', () => {
        //Authenticate programmatically without filling input forms
        cy.loginProgrammatically('standard_user');

        //Verification
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
        cy.get('.shopping_cart_link').should('have.text', '');
    });

    it('Pre-seeds the shopping cart directly via localStorage', () =>{
        //Injects cart state with Sauce Labs Backpack and Bike Light
        const seedCart = [4, 0];
        cy.loginProgrammatically('standard_user', seedCart);

        //Assert UI badge instantly reflects injected localStorage state
        cy.get('.shopping_cart_badge').should('have.text', '2');

        // Open cart via UI button
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_item').should('have.length', 2);
        cy.get('.cart_item').eq(0).should('contain.text', 'Sauce Labs Backpack');
        cy.get('.cart_item').eq(1).should('contain.text', 'Sauce Labs Bike Light');
    });
});
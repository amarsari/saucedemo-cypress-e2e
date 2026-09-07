describe ('Saucedemo - Cart Tests', () => {
    beforeEach(() => {
        cy.login();
    });

    //Scenario A (Item Detail): Click item title -> lands on detail page -> price and name match catalog.
    it('TC-CART-001: Item detail page displays price and name correctly', () => {
        cy.get('[data-test="item-4-title-link"]').click();
        cy.url().should('include', 'item.html?id=4');

        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('contain.text', 'Sauce Labs Backpack');

        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')
            .and('contain.text', '29.99');
    });

    //Scenario B (Add/Remove): Click "Add to Cart" -> verify badge increments to 1 -> click "Remove" -> badge disappears.
    it('TC-CART-002: Add and remove item from cart, make sure badge updates correctly', () =>{
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('contain.text', '1');

        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    //Scenario C (Navigation Loop): Add item -> go to Cart -> click "Continue Shopping" -> assert URL is /inventory.html and cart state persists.
    it('TC-CART-003: Add item to cart, navigate to cart, continue shopping, and verify cart state persists', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="continue-shopping"]').click();

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('contain.text', '1');
    });
});
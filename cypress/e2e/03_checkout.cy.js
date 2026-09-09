describe ('Saucedemo - E2E Order fulfillment', () =>{
    beforeEach(() => {
        cy.login();
    });

    //Scenario A (Form Validation / Negative Test): Add item -> go to cart -> click "Checkout". 
    // Leave inputs blank or type invalid info -> click "Continue" -> assert error message: "Error: First Name is required".
    it ('TC-CHECKOUT-001: Form Validation / Negative Test', () =>{
       cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
       
       // Cart badge assertion
       cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('contain.text', '1');

        // Navigating to cart
        cy.get('[data-test="shopping-cart-link"]').click();

        //Verifying product and price are there
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('contain.text', 'Sauce Labs Backpack');

        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')
            .and('contain.text', '29.99');

        //Clicking Checkout button
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');

        //Clicking continue
        cy.get('[data-test="continue"]').click();

        //Asserting error message
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'Error: First Name is required');

    });

    //Scenario B (Cancel Flow): On Checkout Step One, click "Cancel" -> verify redirect back to cart
    // without submitting order.
    it ('TC-CHECKOUT-002: Cancel Flow', () => {
        //Precondition: Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        
        //Navigate to cart
        cy.get('[data-test="shopping-cart-link"]').click();

        //Verify where we are
        cy.url().should('include', '/cart.html');

        //Click Checkout and move on to next step
        cy.get('[data-test="checkout"]').click();

        //Verify we are at step 1
        cy.url().should('include', '/checkout-step-one.html');

        //Click Cancel button and verify we are back at cart
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/cart.html');
    });

    //Scenatio C: Abort checkout at step 2 and return to inventory
    it ('TC-CHECKOUT-003: Abort checkout at step 2 and return to inventory', () => {
        //Precondition: Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        //Navigate to cart and verify url
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart.html');

        //Click checkout and verify url
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');

        //Fill out form and hit continue button
        cy.get('[data-test="firstName"]').type("John");
        cy.get('[data-test="lastName"]').type("Doe");
        cy.get('[data-test="postalCode"]').type("12345");
        cy.get('[data-test="continue"]').click();

        //Verify we are at step 2
        cy.url().should('include', '/checkout-step-two.html');

        //Click Cancel and verify we are back at inventory page.
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/inventory.html');
    });

    //Scenario D: (Complete Order Happy Path): Add item -> proceed to Checkout -> 
    // fill valid info -> click "Continue". Assert Overview page totals (Item price + Tax = Total). 
    // Click "Finish" -> assert header displays "Thank you for your order!".
    it ('TC-CHECKOUT-004: Complete Order', () => {
        //Precondition: Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        //Verify Cart Badge
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('contain.text', '1');

        //Navigate to Cart
        cy.get('[data-test="shopping-cart-link"]').click();

        //Verify we are at cart page
        cy.url().should('include', '/cart.html');

        //Click Checkout and verify url
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');

        //Fill out form and hit continue button
        cy.get('[data-test="firstName"]').type("John");
        cy.get('[data-test="lastName"]').type("Doe");
        cy.get('[data-test="postalCode"]').type("12345");
        cy.get('[data-test="continue"]').click();

        //Verify we are at step 2
        cy.url().should('include', '/checkout-step-two.html');

        //Assert Overview Page Totals
        cy.get('[data-test="subtotal-label"]')
            .should('be.visible')
            .and('contain.text', 'Item total: $29.99');
        
        cy.get('[data-test="tax-label"]')
            .should('be.visible')
            .and('contain.text', 'Tax: $2.40');
        
        cy.get('[data-test="total-label"]')
            .should('be.visible')
            .and('contain.text', 'Total: $32.39');

        //Click Finish and verify we are at the confirmation page and header displays proper message.
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('contain.text', 'Thank you for your order!');
    });
});
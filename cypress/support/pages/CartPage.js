class CartPage {
    //Getters

    get cartitems(){
        return cy.get('[data-test="inventory-item"]');
    }

    get checkoutButton(){
        return cy.get('[data-test="checkout"]');
    }

    get continueShoppingButton(){
        return cy.get('[data-test="continue-shopping"]');
    }

    //Actions
    assertCartItemVisible(itemName, expectedPrice){
        cy.get('[data-test="inventory-item-name"]').should('contain.text', itemName);
        if(expectedPrice){
            cy.get('[data-test="inventory-item-price"]').should('contain.text', expectedPrice);
        }
    }

    removeItem(productSlug){
        cy.get(`[data-test="remove-${productSlug}"]`).click();
    }

    proceedToCheckout(){
        this.checkoutButton.click();
        cy.url().should('include', '/checkout-step-one.html');
    }

    continueShopping(){
        this.continueShoppingButton.click();
        cy.url().should('include', '/inventory.html');
    }
}

export default new CartPage();
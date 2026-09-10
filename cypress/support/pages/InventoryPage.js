class InventoryPage {
    //Getters
    get cartBadge(){
        return cy.get('[data-test="shopping-cart-badge"]');
    }

    get cartLink(){
        return cy.get('[data-test="shopping-cart-link"]');
    }

    get sortDropdown() {
        return cy.get('[data-test="product-sort-container"]');
    }

    get inventoryItems(){
        //cy.get('[data-test="inventory-list]');
        return cy.get('[data-test="inventory-item"]');
    }

    //Actions
    addItemToCart(productSlug){
        cy.get(`[data-test="add-to-cart-${productSlug}"]`).click();
    }

    removeItemFromCart(productSlug){
        cy.get(`[data-test="remove-${productSlug}"]`).click();
    }

    goToCart(){
        this.cartLink.click();
        cy.url().should('include', '/cart.html');
    }

    selectSortOption(optionValue){
        this.sortDropdown.select(optionValue);
    }

    // Dynamic price verification
assertSortedByPrice(order = 'asc') {
  cy.get('[data-test="inventory-item-price"]')
    .then(($prices) => {
      const actualPrices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
      const expectedPrices = [...actualPrices].sort((a, b) =>
        order === 'asc' ? a - b : b - a
      );
      expect(actualPrices).to.deep.equal(expectedPrices);
    });
}

// Dynamic name verification
assertSortedByName(order = 'asc') {
  cy.get('[data-test="inventory-item-name"]')
    .then(($names) => {
      const actualNames = [...$names].map((el) => el.innerText.trim());
      const expectedNames = [...actualNames].sort((a, b) =>
        order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
      );
      expect(actualNames).to.deep.equal(expectedNames);
    });
}

    assertBadgeCount(expectedCount){
        if (expectedCount === 0) {
            this.cartBadge.should('not.exist');
        }else{
            this.cartBadge.should('be.visible').and('contain.text', expectedCount.toString());
        }
    }

    assertItemDetails(name, price) {
        cy.get('[data-test="inventory-item-name"]').should('contain.text', name);
        cy.get('[data-test="inventory-item-price"]').should('contain.text', price);
    }

}

export default new InventoryPage();
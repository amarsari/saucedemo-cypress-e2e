class CheckoutPage {
    //Getters - Step 1

    get firstNameInput() {
        return cy.get('[data-test="firstName"]');
    }

    get lastNameInput() {
        return cy.get('[data-test="lastName"]');
    }

    get postalCodeInput() {
        return cy.get('[data-test="postalCode"]');
    }

    get continueButton() {
        return cy.get('[data-test="continue"]');
    }

    get cancelButton() {
        return cy.get('[data-test="cancel"]');
    }

    get errorMessage() {
        return cy.get('[data-test="error"]');
    }
    
    //Getters - Step 2 & Complete

    get subtotalLabel() {
        return cy.get('[data-test="subtotal-label"]');
    }

    get taxLabel() {
        return cy.get('[data-test="tax-label"]');
    }

    get totalLabel() {
        return cy.get('[data-test="total-label"]');
    }

    get finishButton() {
        return cy.get('[data-test="finish"]');
    }

    get completeHeader() {
        return cy.get('[data-test="complete-header"]');
    }

    // Actions
    fillInformation(firstName, lastName, postalCode) {
        if (firstName) this.firstNameInput.type(firstName);
        if (lastName) this.lastNameInput.type(lastName);
        if (postalCode) this.postalCodeInput.type(postalCode);
    }

    clickContinue() {
        this.continueButton.click();
    }

    clickCancel() {
        this.cancelButton.click();
    }

    finishOrder() {
        this.finishButton.click();
        cy.url().should('include', '/checkout-complete.html');
    }

    assertTotals(subtotal, tax, total) {
        this.subtotalLabel.should('contain.text', subtotal);
        this.taxLabel.should('contain.text', tax);
        this.totalLabel.should('contain.text', total);
    }

    assertOrderSuccess() {
        this.completeHeader
        .should('be.visible')
        .and('contain.text', 'Thank you for your order!');
    }

    assertErrorMessage(expectedPattern) {
        this.errorMessage
            .should('be.visible')
            .and(($el) => {
            expect($el.text()).to.match(expectedPattern);
            });
    }
}

export default new CheckoutPage();
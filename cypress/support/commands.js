Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginProgrammatically', (username = 'standard_user', cartItems = []) => {
    cy.setCookie('session-username', username);
    
    cy.visit('/inventory.html', {
        failOnStatusCode: false,
        onBeforeLoad(win) {
            //Prepulate caart items if requested
            if (cartItems.length > 0) {
                win.localStorage.setItem('cart-contents', JSON.stringify(cartItems));
            }
        }
    });
});
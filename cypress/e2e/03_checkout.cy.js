import LoginPage from '../support/pages/LoginPage';
import InventoryPage from '../support/pages/InventoryPage';
import CartPage from '../support/pages/CartPage';
import CheckoutPage from '../support/pages/CheckoutPage';

describe ('Saucedemo - E2E Order fulfillment', () =>{
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });
    
    //Product to be added to cart
    const productSlug = 'sauce-labs-backpack';
    const itemTitle = 'Sauce Labs Backpack';
    const itemPrice = '29.99';
    //****************************

    //Scenario A (Form Validation / Negative Test): Add item -> go to cart -> click "Checkout". 
    // Leave inputs blank or type invalid info -> click "Continue" -> assert error message: "Error: First Name is required".
    it ('TC-CHECKOUT-001: Form Validation / Negative Test', () =>{
        //Adding top item to cart
        InventoryPage.addItemToCart(productSlug);
        
        // Cart badge assertion
        InventoryPage.assertBadgeCount(1);
        
        // Navigating to cart and verifying url
        InventoryPage.goToCart();
        
        //Verifying product and price are there
        CartPage.assertCartItemVisible(itemTitle, itemPrice)
        
        //Clicking Checkout button
        CartPage.proceedToCheckout();
        
        //Clicking continue
        CheckoutPage.clickContinue();
        
        //Asserting error message
        CheckoutPage.assertErrorMessage(/Error: First Name is required/i);
    });

    //Scenario B (Cancel Flow): On Checkout Step One, click "Cancel" -> verify redirect back to cart
    // without submitting order.
    it ('TC-CHECKOUT-002: Cancel Flow', () => {
        //Precondition: Add item to cart
        //Adding top item to cart
        InventoryPage.addItemToCart(productSlug);
        
        //Navigate to cart and verify url
        InventoryPage.goToCart();

        //Click Checkout and move on to next step
        CartPage.proceedToCheckout();

        //Click Cancel button and verify we are back at cart
        CheckoutPage.clickCancel();
        cy.url().should('include', '/cart.html');
    });

    //Scenatio C: Abort checkout at step 2 and return to inventory
    it ('TC-CHECKOUT-003: Abort checkout at step 2 and return to inventory', () => {
        //Precondition: Add item to cart
        InventoryPage.addItemToCart(productSlug);

        //Navigate to cart and verify url
        InventoryPage.goToCart();
        
        //Click checkout and verify url
        CartPage.proceedToCheckout();

        //Fill out form and hit continue button
        CheckoutPage.fillInformation('John', 'Doe', '12345');
        CheckoutPage.clickContinue();

        //Verify we are at step 2
        cy.url().should('include', '/checkout-step-two.html');

        //Click Cancel and verify we are back at inventory page.
        CheckoutPage.clickCancel();
        cy.url().should('include', '/inventory.html');
    });

    //Scenario D: (Complete Order Happy Path): Add item -> proceed to Checkout -> 
    // fill valid info -> click "Continue". Assert Overview page totals (Item price + Tax = Total). 
    // Click "Finish" -> assert header displays "Thank you for your order!".
    it ('TC-CHECKOUT-004: Complete Order', () => {
        //Precondition: Add item to cart
        InventoryPage.addItemToCart(productSlug);

        //Verify Cart Badge
        InventoryPage.assertBadgeCount(1);
        
        //Navigate to Cart and verify
        InventoryPage.goToCart();

        //Click Checkout and verify url
        CartPage.proceedToCheckout();
        
        //Fill out form and hit continue button
        CheckoutPage.fillInformation('John', 'Doe', '12345');
        CheckoutPage.clickContinue();

        //Verify we are at step 2
        cy.url().should('include', '/checkout-step-two.html');

        //Assert Overview Page Totals
        CheckoutPage.assertTotals('29.99', '2.40', '32.39');

        //Click Finish and verify we are at the confirmation page and header displays proper message.
        CheckoutPage.finishOrder();
        CheckoutPage.assertOrderSuccess();
    });
});
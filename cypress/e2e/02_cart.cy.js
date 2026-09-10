import CartPage from '../support/pages/CartPage';
import LoginPage from '../support/pages/LoginPage';
import InventoryPage from '../support/pages/InventoryPage';

describe ('Saucedemo - Cart Tests', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });

    //Scenario A (Item Detail): Click item title -> lands on detail page -> price and name match catalog.
    it('TC-CART-001: Item detail page displays price and name correctly', () => {
        
        
        cy.get('[data-test="item-4-title-link"]').click();
        cy.url().should('include', 'item.html?id=4');

        InventoryPage.assertItemDetails('Sauce Labs Backpack', '$29.99');

    });

    //Scenario B (Add/Remove): Click "Add to Cart" -> verify badge increments to 1 -> click "Remove" -> badge disappears.
    it('TC-CART-002: Add and remove item from cart, make sure badge updates correctly', () =>{
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.assertBadgeCount(1);
        
        InventoryPage.removeItemFromCart('sauce-labs-backpack');
        InventoryPage.assertBadgeCount(0);
    });

    //Scenario C (Navigation Loop): Add item -> go to Cart -> click "Continue Shopping" -> assert URL is /inventory.html and cart state persists.
    it('TC-CART-003: Add item to cart, navigate to cart, continue shopping, and verify cart state persists', () => {
        InventoryPage.addItemToCart('sauce-labs-backpack');
        InventoryPage.assertBadgeCount(1);
        InventoryPage.goToCart();
        CartPage.continueShopping();
        InventoryPage.assertBadgeCount(1);
    });
});
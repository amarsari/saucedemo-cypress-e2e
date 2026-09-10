import LoginPage from '../support/pages/LoginPage';
import InventoryPage from '../support/pages/InventoryPage';

describe ('Saucedemo Catalog Browsing / Sorting', ()=> {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });

    //Scenario A: Sort products by name A to Z
    it ('TC-CATALOG-001: Sort products by name A to Z', () =>{
        InventoryPage.selectSortOption('az');
        InventoryPage.assertSortedByName('asc');
    });

    //Scenario B: Sort products by name Z to A
    it ('TC-CATALOG-002: Sort products by name Z to A', () =>{
        InventoryPage.selectSortOption('za');
        InventoryPage.assertSortedByName('desc');
    });

    //Scenario C: Sort products by price low to high
    it ('TC-CATALOG-003: Sort products by price low to high', () =>{
        InventoryPage.selectSortOption('lohi');
        InventoryPage.assertSortedByPrice('asc');
    });

    //Scenario D: Sort products by price high to low
    it ('TC-CATALOG-004: Sort products by price high to low', () => {
        InventoryPage.selectSortOption('hilo');
        InventoryPage.assertSortedByPrice('desc');
    });
});
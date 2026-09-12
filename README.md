# SauceDemo E2E Automated Test Suite

![Cypress E2E Tests](https://github.com/amarsari/saucedemo-cypress-e2e/actions/workflows/cypress.yml/badge.svg)
![Cypress Version](https://img.shields.io/badge/Cypress-14.x-04C38C?logo=cypress)
![Node.js Version](https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=githubactions)

An end-to-end (E2E) test automation framework built for [SauceDemo](https://www.saucedemo.com/) using Cypress and JavaScript. The project implements an enterprise-grade Page Object Model (POM), resilient locator strategies, dynamic array-based DOM assertions, and automated headless CI/CD execution.

---

## Architecture & Design Patterns

* **Page Object Model (POM):** UI selectors and user interactions are decoupled into dedicated page classes under `cypress/support/pages/` (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`), eliminating brittle inline selectors in test specs.
* **Resilient Locators:** Strict prioritization of dedicated testing attributes (`[data-test="..."]`) over layout-dependent CSS classes to prevent test decay across frontend redesigns.
* **Dynamic DOM Assertions:** Catalog sorting assertions (A-Z, Z-A, Price Low-High, Price High-Low) extract text and price data into runtime arrays and validate against algorithmic sorting logic, avoiding hardcoded static expectations.
* **CI/CD Integration:** Configured via GitHub Actions (`.github/workflows/cypress.yml`) to automatically execute the full headless suite in Google Chrome on every push and pull request, archiving test artifacts on failure.

---

## Test Coverage Matrix

| Spec File | Suite / Feature Area | Key Scenarios Covered |
| :--- | :--- | :--- |
| `01_auth.cy.js` | Authentication & Access Control | Standard login, invalid credentials error handling, locked-out user validations |
| `02_cart.cy.js` | Cart State & Navigation | Adding/removing items, badge count synchronization across routes, cart persistence |
| `03_checkout.cy.js` | Checkout & Financial Summary | Multi-step user details, validation gate empty fields, item total and tax verification, complete purchase |
| `04_catalog.cy.js` | Dynamic Catalog Sorting | Algorithmic A-Z / Z-A string checks, ascending / descending price parsing and verification |

---

## Project Structure

```text
saucedemo-cypress-e2e/
├── .github/
│   └── workflows/
│       └── cypress.yml         # GitHub Actions CI workflow
├── cypress/
│   ├── e2e/
│   │   ├── 01_auth.cy.js       # Authentication tests
│   │   ├── 02_cart.cy.js       # Shopping cart workflows
│   │   ├── 03_checkout.cy.js   # Multi-step checkout & payment calculations
│   │   └── 04_catalog.cy.js    # Dynamic catalog sorting suite
│   ├── fixtures/               # Test data fixtures (JSON)
│   └── support/
│       ├── pages/              # Page Object Model class definitions
│       │   ├── CartPage.js
│       │   ├── CheckoutPage.js
│       │   ├── InventoryPage.js
│       │   └── LoginPage.js
│       ├── commands.js         # Custom Cypress commands
│       └── e2e.js              # Global support configuration
├── cypress.config.js           # Cypress configuration settings
├── package.json
└── README.md

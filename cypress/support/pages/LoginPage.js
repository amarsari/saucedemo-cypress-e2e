class LoginPage {
    //Getters
    get usernameInput(){
        return cy.get('[data-test="username"]');
    }

    get passwordInput(){
        return cy.get('[data-test="password"]');
    }

    get loginButton(){
        return cy.get('[data-test="login-button"]');
    }

    get errorMessage(){
        return cy.get('[data-test="error"]');
    }

    //Actions
    visit(){
        cy.visit('/');
    }

    fillUsername(username){
        this.usernameInput.clear().type(username);
    }

    fillPassword(password){
        this.passwordInput.clear().type(password, { log: false });
    }

    clickLogin(){
        this.loginButton.click();
    }

    login(username, password){
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLogin();
    }

    //Helper function
    assertErrorMessage(expectedPattern) {
    this.errorMessage
        .should('be.visible')
        .and(($el) => {
        expect($el.text()).to.match(expectedPattern);
        });
    }
}

export default new LoginPage();
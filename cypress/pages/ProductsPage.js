import { endpointsUI } from '../support/endpointsUI';

class ProductsPage {
    elements = {
        emailInputLogin: '[data-qa="login-email"]',
        passwordInputLogin: '[data-qa="login-password"]',
        loginButton: '[data-qa="login-button"]',
        
        nameInputSignup: '[data-qa="signup-name"]',
        emailInputSignup: '[data-qa="signup-email"]',
        signupButton: '[data-qa="signup-button"]',

        errorMessage: '.login-form p',
        loggedMessage: ''
    }
    visitPage(){
        cy.visit(endpointsUI.products);
    }

    fillLogin(emailLogin) {
        cy.get(this.elements.emailInputLogin)
        .should('be.visible')
        .type(emailLogin);
    }
    fillPassword(passwordLogin){
        cy.get(this.elements.passwordInputLogin)
        .should('be.visible')
        .type(passwordLogin);
    }
    clickLogin(){
        cy.get(this.elements.loginButton)
        .should('be.visible')
        .click();
    }

    fillNameSignup(nameSignup){
        cy.get(this.elements.nameInputSignup)
        .should('be.visible')
        .type(nameSignup);
    }
    fillEmailSignup(emailSignup){
        cy.get(this.elements.emailInputSignup)
        .should('be.visible')
        .type(emailSignup);
    }
    clickSignup(){
        cy.get(this.elements.signupButton)
        .should('be.visible')
        .click();
    }
    validateLoginError(messageError){
        cy.get(this.elements.errorMessage)
        .should('be.visible')
        .and('contain.text', messageError);
    }
    validateUserLogged(userName){
        cy.contains('a', 'Logged in as')
        .should('be.visible')
        .and('contain.text', userName);
    }
}
export default new LoginPage()
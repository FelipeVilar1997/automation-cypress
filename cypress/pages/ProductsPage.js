import { endpointsUI } from '../support/endpointsUI.js';

class ProductsPage {
    elements = {
        searchInput: '#search_product',
        searchButton: '#submit_search',
        productInformation: '.product-information',
        productName: '.product-information h2',
        productPrice: '.product-information span span'
    }
    visitPage(){
        cy.visit(endpointsUI.products);
    }
    selectProduct(nameProduct) {
        cy.contains('p', nameProduct)
        .parents('.product-image-wrapper')
        .contains('View Product')
        .click();
    }
    searchProduct(nameProduct){
        cy.get(this.elements.searchInput) 
        .should('be.visible')
        .type(nameProduct);
        cy.get(this.elements.searchButton)
        .should('be.visible')
        .click();
    }
    validProductName(nameProduct){
        cy.get(this.elements.productName)
        .should('be.visible')
        .and('contain.text', nameProduct);
    }
    validMessageProductAddCart(){
        cy.contains('Added!')
        .should('be.visible');
        cy.contains('Your product has been added to cart.')
        .should('be.visible');
        cy.contains('button', 'Continue Shopping')
        .should('be.visible')
        .click();
    }
    validProductCart(nameProduct){
        cy.contains('a', 'Cart')
        .should('be.visible')
        .click();
        cy.contains(nameProduct)
        .should('be.visible');
    }
    validProductValue(productValue){
        cy.get(this.elements.productPrice)
        .should('be.visible')
        .and('contain.text', productValue);
    }
    validProductDisponibility(disponibilityProduct){
        cy.get(this.elements.productInformation)
        .contains('b', 'Availability:')
        .parent('p')
        .should('contain.text', disponibilityProduct);
    }
    validProductCondition(conditionProduct){
        cy.get(this.elements.productInformation)
        .contains('b', 'Condition:')
        .parent('p')
        .should('be.visible')
        .and('contain.text', conditionProduct);
    }
    validProductType(typeProduct){
        cy.get(this.elements.productInformation)
        .contains('b', 'Brand:')
        .parent('p')
        .should('be.visible')
        .and('contain.text', typeProduct);
    }
    clickAddCart(){
        cy.contains('button', 'Add to cart')
        .should('be.visible')
        .click();
    }
    clickProductPage(){
        cy.contains('Products')
        .should('be.visible')
        .click();
    }
}
export default new ProductsPage()
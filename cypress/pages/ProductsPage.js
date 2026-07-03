import { endpointsUI } from '../support/endpointsUI.js';

class ProductsPage {
    elements = {
        searchInput: '#search_product',
        searchButton: '#submit_search',
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
    validProduct(nameProduct){
        cy.contains(nameProduct)
        .should('be.visible');
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
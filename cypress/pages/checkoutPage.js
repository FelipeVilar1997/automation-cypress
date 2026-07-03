class ProductsPage {
    elements = {
        buttonCheckout: 'Proceed To Checkout',
        buttonPlaceOrder: 'Place Order',
        adressScreen: 'Address Details',
        paymentScreen: 'Payment',
        reviewOrder: 'Review Your Order',
    }

    selectProceedCheckout(nameProduct) {
        cy.contains(this.elements.buttonCheckout)
        .should('be.visible')
      //  .and('contain.text', 'Proceed To Checkout')
        .click();
    }
    validDetailsOrderAndAdress(productName){
        cy.contains(this.elements.adressScreen)
        .should('be.visible');
        cy.contains(this.elements.reviewOrder)
        .should('be.visible');
        cy.contains(productName)
        .should('be.visible');
    }
    clickPaymentStep(){
        cy.contains(this.elements.buttonPlaceOrder)
        .should('be.visible')
        .click();
    }
    validPaymentScreen(){
        cy.contains(this.elements.paymentScreen)
        .should('be.visible');
    }
}
export default new ProductsPage()
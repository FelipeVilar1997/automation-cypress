import { parsePriceToNumber } from '../support/utils/valueUtils.js'

class CheckoutPage {
    elements = {
        buttonCheckout: 'Proceed To Checkout',
        buttonPlaceOrder: 'Place Order',
        adressScreen: 'Address Details',
        paymentScreen: 'Payment',
        reviewOrder: 'Review Your Order',

        checkoutInformation: '[data-qa="checkout-info"]',
        deliveryAdress: '#address_delivery',
        billingAdress: '#address_invoice',

        reviewOrderTable: '#cart_info',
        cartItems: '.cart_item',
        totalResult: '.total-result',

        cardNameField: '[data-qa="name-on-card"]',
        cardNumberField: '[data-qa="card-number"]',
        cardCVCField: '[data-qa="cvc"]',
        cardMonthExpiryField: '[data-qa="expiry-month"]',
        cardYearExpirayField: '[data-qa="expiry-year"]',
        buttonConfirmPayAndOrder: '[data-qa="pay-button"]',
        buttonContinueOrderConfirmed: '[data-qa="continue-button"]',

        txtPaymentConfirmed: 'Your order has been placed successfully!',
        txtMessageOrderPlaced: '[data-qa="order-placed"]',
        txtOrderConfirmed: 'Congratulations! Your order has been confirmed!',

        headerHome: '#header'
    }

    selectProceedCheckout(nameProduct) {
        cy.contains(this.elements.buttonCheckout)
        .should('be.visible')
        .click();
    }
    
    validateDeliveryDetailsAddress(userAddress){
        cy.get(this.elements.checkoutInformation)
        .should('be.visible');
        cy.get(this.elements.deliveryAddress, {
            title: 'Your delivery address',
            ...userAddress
        })
    }

    validateBillingDetailAddress(userAddress){
        cy.get(this.elements.checkoutInformation)
        .should('be.visible');
        cy.get(this.elements.billingAdress, {
            title: 'Your billing address',
            ...userAddress
        })
    }
    validateReviewOrderProduct(product) {
        const expectedPrice = parsePriceToNumber(product.price)
        const expectedQuantity = Number(product.quantity)
        const expectedLineTotal = expectedPrice * expectedQuantity

        cy.contains('tr', product.name, { timeout: 10000 })
        .should('be.visible')
        .within(() => {
            cy.get('.cart_description')
            .should('contain.text', product.name)

            cy.get('.cart_price')
            .invoke('text')
            .then((priceText) => {        
            const actualPrice = parsePriceToNumber(priceText)
            expect(actualPrice).to.eq(expectedPrice)
            })

            cy.get('.cart_quantity')
            .invoke('text')
            .then((quantityText) => {
                const actualQuantity = Number(quantityText.trim())
                expect(actualQuantity).to.eq(expectedQuantity)
            })

            cy.get('.cart_total_price')
            .invoke('text')
            .then((totalText) => {
                const actualLineTotal = parsePriceToNumber(totalText)
                expect(actualLineTotal).to.eq(expectedLineTotal)
            })
        })
    }

    validateTotalAmount(product) {
        const expectedPrice = parsePriceToNumber(product.price)
        const expectedQuantity = Number(product.quantity)
        const expectedShipping = parsePriceToNumber(product.shipping)
        const expectedSubtotal = expectedPrice * expectedQuantity
        const expectedTotal = expectedSubtotal + expectedShipping

        cy.contains('tr', 'Total Amount', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((totalAmountText) => {
            const actualTotalAmount = parsePriceToNumber(totalAmountText)
            expect(actualTotalAmount).to.eq(expectedTotal)
      })
    }

    validateReviewOrder(product) {
        expect(product, 'Produto recebido no Review Order').to.exist
        expect(product.name, 'Nome do produto recebido').to.exist

        this.validateReviewOrderProduct(product)
        this.validateTotalAmount(product)
    }

    typeNamePaymentCard(nameCard){
        cy.contains(this.elements.buttonPlaceOrder)
        .should('be.visible');
        cy.get(this.elements.cardNameField)
        .should('be.visible')
        .clear()
        .type(nameCard);
    }

    typeNumberPaymentCard(cardNumber){
        cy.get(this.elements.cardNumberField)
        .should('be.visible')
        .type(cardNumber);
    }

    typeCVCPaymentCard(numberCVC){
        cy.get(this.elements.cardCVCField)
        .should('be.visible')
        .type(numberCVC);    
    }

    typeDateExpiratyPaymentCard(dateExpiryMonth, dateExpiryYear){
        cy.get(this.elements.cardMonthExpiryField)
        .should('be.visible')
        .type(dateExpiryMonth);

        cy.get(this.elements.cardYearExpirayField)
        .should('be.visible')
        .type(dateExpiryYear);        
    }

    typePaymentData(payment){
        this.typeNamePaymentCard(payment.nameCard);
        this.typeNumberPaymentCard(payment.cardNumber);
        this.typeCVCPaymentCard(payment.numberCVC);
        this.typeDateExpiratyPaymentCard(payment.dateExpiryMonth, payment.dateExpiryYear)
    }

    clickPaymentStep(){
        cy.contains(this.elements.buttonPlaceOrder)
        .should('be.visible')
        .click();
    }

    clickPaymentOrder(){
        cy.get(this.elements.buttonConfirmPayAndOrder)
        .should('be.visible')
        .click();
    }

    validatePaymentScreen(){
        cy.contains(this.elements.paymentScreen)
        .should('be.visible');
    }

    validatePaymentSucess(){
        cy.contains('p', this.elements.txtPaymentConfirmed)
        .should('be.visible')
    }

    validateOrderConfirmed(){
        cy.get(this.elements.txtMessageOrderPlaced)
        .should('be.visible')
        .and('contain.text', 'Order Placed!');

        cy.contains('p', this.elements.txtOrderConfirmed)
        .should('be.visible');    
    }

    validateBackHome(){
        cy.get(this.elements.buttonContinueOrderConfirmed)
        .should('be.visible')
        .click();

        cy.get(this.elements.headerHome)
        .should('be.visible');
    }

    clickContinueBackHome(){
        cy.get(this.elements.buttonContinueOrderConfirmed)
        .should('be.visible')
        .click();
    }
}
export default new CheckoutPage()
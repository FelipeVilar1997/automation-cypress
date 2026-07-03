import loginPage from '../../pages/LoginPage'
import productsPage from '../../pages/ProductsPage';
import checkoutPage from '../../pages/checkoutPage'

describe('Signup Tests', () => {
  let users
  let products

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })
    cy.fixture('products').then((data) => {
      products = data
    })  
    loginPage.visitPage();
  })
  it('Adicionar produto com usuario logado', () => {
    cy.step('Preencher e-mail usuario');
        loginPage.fillLogin(users.validUser.email);
    
        cy.step('Preencher senha usuario');
        loginPage.fillPassword(users.validUser.password);
    
        cy.step('Realizando login');  
        loginPage.clickLogin();
    
        cy.step('Direcionar para a pagina de produtos')
        productsPage.visitPage();

        cy.step('Buscar produto pelo nome');
        productsPage.searchProduct(products.product_2.name);
        
        cy.step('Selecionar produto');
        productsPage.selectProduct(products.product_2.name);
        
        cy.step('Visualizar pagina do produto');
        productsPage.validProduct(products.product_2.name);
        
        cy.step('Adicionar o produto ao carrinho');
        productsPage.clickAddCart();
        
        cy.step('Popup de produto adicionado ao carrinho');
        productsPage.validMessageProductAddCart();
        
        cy.step('Validar produto no carrinho');
        productsPage.validProductCart();

        cy.step('Selecionar checkout pedido')
        checkoutPage.selectProceedCheckout();

        cy.step('Validar tela de Endereco e resumo pedido')
        checkoutPage.validDetailsOrderAndAdress(products.product_2.name);

        cy.step('Selecionar tela de pagamento')
        checkoutPage.clickPaymentStep();

        cy.validation('Validar tela de pagamento')
        checkoutPage.validPaymentScreen();
  })
})  
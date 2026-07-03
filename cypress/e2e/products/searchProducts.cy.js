import productsPage from '../../pages/ProductsPage';

describe('Signup Tests', () => {
  let products

  beforeEach(() => {
    cy.fixture('products').then((data) => {
      products = data
    })
    productsPage.visitPage();
  })
  it('CT01 - Buscar produto', () => {
    cy.step('Buscar produto pelo nome');
    productsPage.searchProduct(products.product_1.name);

    cy.step('Selecionar produto');
    productsPage.selectProduct(products.product_1.name);

    cy.validation('Validar pagina do produto');
    productsPage.validProduct(products.product_1.name);
  })
  it('CT02 - Adicionar produto com busca', () => {
    cy.step('Buscar produto pelo nome');
    productsPage.searchProduct(products.product_3.name);

    cy.step('Selecionar produto');
    productsPage.selectProduct(products.product_3.name);

    cy.step('Visualizar pagina do produto');
    productsPage.validProduct(products.product_3.name);

    cy.step('Adicionar o produto ao carrinho');
    productsPage.clickAddCart();

    cy.step('Popup de produto adicionado ao carrinho');
    productsPage.validMessageProductAddCart();

    cy.validation('Validar produto no carrinho');
    productsPage.validProductCart();
  })
})  
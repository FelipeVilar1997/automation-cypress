import loginPage from '../../pages/LoginPage'
import productsPage from '../../pages/ProductsPage';

describe('Signup Tests', () => {
  let users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })
    productsPage.visitPage();
  })
  it('Adicionar produto com usuario logado', () => {
    productsPage.searchProduct('Sleeveless Dress');
    productsPage.selectProduct('Sleeveless Dress');
    productsPage.validProduct('Sleeveless');
    productsPage.clickAddCart();
    productsPage.validMessageProductAddCart();
    



    productsPage.validProductCart();
  })
})  
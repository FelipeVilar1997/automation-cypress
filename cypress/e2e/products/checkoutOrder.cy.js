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

    loginPage.clickButtonLoginMenu();
    loginPage.fillLogin(users.validUser.email);
    loginPage.fillPassword(users.validUser.password);
    loginPage.clickLogin();
    loginPage.validateUserLogged(users.validUser.nameUser);

    productsPage.validProductCart();
  })
})  
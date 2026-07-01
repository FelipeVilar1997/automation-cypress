import loginPage from '../../pages/LoginPage';

describe('Login Tests', () => {
  let users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })
    loginPage.visitPage();
  })


  it('CT01 - Login com usuario valido', () => {
    loginPage.visitPage();
    loginPage.fillLogin(users.validUser.email);
    loginPage.fillPassword(users.validUser.password);
    loginPage.clickLogin();
    loginPage.validateUserLogged(users.validUser.nameUser);
  })

  it('CT02 - Login com email invalido', () => {
    loginPage.visitPage();
    loginPage.fillLogin(users.invalidEmail.email);
    loginPage.fillPassword(users.invalidEmail.password);
    loginPage.clickLogin();
    loginPage.validateLoginError('Your email or password is incorrect!')  
  })

    it('CT03 Login com senha invalida', () => {
    loginPage.visitPage();
    loginPage.fillLogin(users.invalidPassword.email);
    loginPage.fillPassword(users.invalidPassword.password);
    loginPage.clickLogin();
    loginPage.validateLoginError('Your email or password is incorrect!')  
  })
})
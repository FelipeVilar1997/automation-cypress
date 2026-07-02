import loginPage from '../../pages/LoginPage';

describe('Login Tests', () => {
  let users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })
    cy.step('Acessar tela de login');
    loginPage.visitPage();
  })


  it('CT01 - Login com usuario valido', () => {
    cy.step('Preencher e-mail usuario');
    loginPage.fillLogin(users.validUser.email);

    cy.step('Preencher senha usuario');
    loginPage.fillPassword(users.validUser.password);

    cy.step('Realizando login');  
    loginPage.clickLogin();

    cy.validation('Validar usuario logado com sucesso');
    loginPage.validateUserLogged(users.validUser.nameUser);
  })

  it('CT02 - Login com email invalido', () => {
    cy.step('Preencher e-mail usuario invalido');
    loginPage.fillLogin(users.invalidEmail.email);

    cy.step('Preencher senha usuario');
    loginPage.fillPassword(users.invalidEmail.password);

    cy.step('Realizando tentativa de login');  
    loginPage.clickLogin();

    cy.validation('Validar mensagem de erro');
    loginPage.validateLoginError('Your email or password is incorrect!')  
  })

    it('CT03 Login com senha invalida', () => {
    cy.step('Preencher e-mail usuario');
    loginPage.fillLogin(users.invalidPassword.email);

    cy.step('Preencher senha incorreta');
    loginPage.fillPassword(users.invalidPassword.password);

    cy.step('Realizando tentativa de login');  
    loginPage.clickLogin();

    cy.validation('Validar mensagem de erro');
    loginPage.validateLoginError('Your email or password is incorrect!')  
  })
})
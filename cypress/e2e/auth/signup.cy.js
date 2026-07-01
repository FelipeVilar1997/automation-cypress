import loginPage from '../../pages/LoginPage';

describe('Signup Tests', () => {
  let users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })
    loginPage.visitPage();
  })
  it('Sign com usuario valido', () => {
    loginPage.visitPage();
    loginPage.fillNameSignup(users.newUser.email);
    loginPage.fillEmailSignup(users.newUser.password);
    loginPage.clickSignup();
    loginPage.validateUserLogged(users.newUser.nameUser);
  })
})
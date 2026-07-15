import { Before, After, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import loginPage from '../../../pages/LoginPage.js';

Before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});
After(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

  Given('que acesso a tela de login', () => {
    cy.info('Acessando tela de login');
    loginPage.visitPage();
  });

  When('informo o email {string}', (email) => {
    cy.info(`Informando email: ${email}`);
    loginPage.fillLogin(email);
  });

  When('informo a senha {string}',(senha) => {
    cy.info(`Informando a senha`);
    loginPage.fillPassword(senha);
  });

  When('clico no botao de login', () => {
    cy.info(`Clicando no botao de login`);
    loginPage.clickLogin();
  });

  Then('devo visualizar o resultado {string} do sistema', (feedback) => {
    if(feedback === 'Teste Automacao'){
      cy.info(`Validando usuario logado: ${feedback}`);
      loginPage.validateUserLogged(feedback);
    }else{
      cy.info(`Validando feedback Email/Senha incorreto: ${feedback}`);
      loginPage.validateLoginError(feedback);
    }
  });
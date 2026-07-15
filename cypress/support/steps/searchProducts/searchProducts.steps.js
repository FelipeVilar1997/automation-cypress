import { Before, After, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import  productsPage  from '../../../pages/ProductsPage.js'


Before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
})
After(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
})

Given('estou na tela de produtos', () => {
    cy.info('Acessando tela de produtos');
    productsPage.visitPage();
});

When('realizo a busca de um produto {string}', (produto) => {
    cy.info(`Realizando busca do produto: ${produto}`);
    productsPage.searchProduct(produto);
});

When('seleciono o produto {string}', (produto) => {
    cy.info(`Selecionando o produto: ${produto}`);
    productsPage.selectProduct(produto);
});

When('adiciono ao carrinho', () => {
    cy.info(`Adicionando o produto ao carrinho`);
	productsPage.clickAddCart();
    cy.info('Validando mensagem de produto adicionado ao carrinho');
    productsPage.validMessageProductAddCart();
});

Then('valido o nome {string}', (produto) => {
    cy.info(`Validando nome produto: ${produto}`);
    productsPage.validProductName(produto)
});

Then('valido o valor {string}', (valor) => {
    cy.info(`Validando valor do produto: ${valor}`);
    productsPage.validProductValue(valor);
});

Then('valido a disponibilidade {string}', (disponibilidade) => {
    cy.info(`Validando disponibilidade do produto: ${disponibilidade}`);
    productsPage.validProductDisponibility(disponibilidade);
});

Then('valido a condicao {string}', (condicao) => {
    cy.info(`Validando condicao do produto: ${condicao}`);
	productsPage.validProductCondition(condicao);
});

Then('valido o tipo {string}', (tipo) => {
    cy.info(`Validando tipo do produto: ${tipo}`);
	productsPage.validProductType(tipo);
});

Then('valido se o produto {string} foi adicionado com sucesso', (produto) => {
    cy.info(`Validando produto no carrinho: ${produto}`);
    productsPage.validProductCart(produto);
});



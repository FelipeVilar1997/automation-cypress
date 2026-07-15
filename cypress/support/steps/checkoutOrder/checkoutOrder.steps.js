import { Before, After, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import loginPage from '../../../pages/LoginPage.js';
import productsPage from '../../../pages/ProductsPage.js';
import checkoutPage from '../../../pages/CheckoutPage.js';
import { generatePaymentData } from '../../utils/faker/paymentFactory.js';

let user;

Before({ tags: '@logged' }, () => {
    cy.fixture('users').then((users) => {
        user = users.validUser
    
        cy.info('Acessando tela de login');
        loginPage.visitPage();

        cy.info(`Informando email: ${user.email}`);
        loginPage.fillLogin(user.email);

        cy.info(`Informando a senha`);
        loginPage.fillPassword(user.password);

        cy.info(`Clicando no botao de login`);
        loginPage.clickLogin();

        cy.info(`Validando usuario logado: ${user.userName}`);
        loginPage.validateUserLogged(user.userName);
    })
});
After(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

Given('estou na pagina de produtos', () => {
    cy.info(`Abrindo a pagina de produtos`);
    productsPage.clickProductPage();
});

When('adiciono produto {string} ao carrinho', (produto) => {
    cy.info(`Realizando busca do produto: ${produto}`);
    productsPage.searchProduct(produto);

    cy.info(`Selecionando o produto: ${produto}`);
    productsPage.selectProduct(produto);

    cy.info(`Validando nome produto: ${produto}`);
    productsPage.validProductName(produto)

    cy.info(`Adicionando o produto ao carrinho`);
    productsPage.clickAddCart();

    cy.info(`Validando mensagem de produto adicionado ao carrinho`);
    productsPage.validMessageProductAddCart();
});

When('seleciono para prosseguir para o carrinho', () => {
    cy.info(`Selecionando carrinho`);
    productsPage.clickCart();
});

When('o produto esta no carrinho {string}', (produto) => {
	cy.info(`Validando produto no carrinho: ${produto}`);
    productsPage.validProductCart(produto);
});

Then('prossigo para a tela de checkout', () => {
    cy.info(`Seguindo para a tela de checkout`);
	checkoutPage.selectProceedCheckout();
});

Then('valido se o endereco esta preenchido', () => {
    cy.info(`Validando o endereco`);
	checkoutPage.validBillingDetailAddress(user.address);
});


Then('valido se o resumo do pedido esta de acordo {string} {string} {string} {string}', (produto, preco, quantidade, frete) => {
    const product = {
        name: produto,
        price: preco,
        quantity: quantidade,
        shipping: frete
    }

    cy.info(`Validando o resumo do pedido`);
    checkoutPage.validateReviewOrder(product);
});

Then('seleciono para prosseguir para o pagamento', () => {
    cy.info(`Seguindo para a tela de pagamento`);
	checkoutPage.clickPaymentStep();
});

Then('preencho os dados de pagamento com cartao', () => {
	const paymentData = generatePaymentData();    

    cy.info(`Preenchendo dados de pagamento gerados: ${JSON.stringify(paymentData)}`);
    checkoutPage.typePaymentData(paymentData);
});

Then('valido se o pagamento e realizado com sucesso', () => {
    cy.info(`Clicando em confirmar pagamento`);
    checkoutPage.clickPaymentOrder();
    
    cy.info(`Confirmando se o pagamento e o pedido foram confirmados`);
	checkoutPage.validateOrderConfirmed();
});

Then('retorno para a tela inicial', () => {
    cy.info(`Retornando para a Home Page`);
	checkoutPage.validateBackHome();
});

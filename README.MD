# Automation Cypress JS

Projeto de automação de testes utilizando **Cypress** com **JavaScript**, criado para demonstrar habilidades em testes automatizados de UI e API.

---

## Objetivo

O objetivo deste projeto é praticar e demonstrar conhecimentos em automação de testes com Cypress, aplicando boas práticas como:

* Organização de testes por funcionalidade
* Reaproveitamento de código com Page Objects
* Uso de fixtures para massa de dados
* Testes de interface web
* Testes de API
* Execução local e via CI/CD

---

## Tecnologias utilizadas

* Cypress
* JavaScript
* Node.js
* NPM
* GitHub Actions
* Fixtures JSON

---

## Estrutura básica do projeto

```text
cypress/
  e2e/
    api/
    auth/
    products/

  fixtures/
    users.json
    products.json

  pages/
    LoginPage.js
    ProductsPage.js
    CheckoutPage.js

  support/
    commands.js
    e2e.js
    endpointsAPI.js
    endpointsUI.js

cypress.config.js
package.json
package.json
README.md
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/FelipeVilar1997/automation-cypress.git
```

Acesse a pasta do projeto:

```bash
cd automation-cypress
```

Instale as dependências:

```bash
npm install
```

---

## Como executar

Abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Executar todos os testes em modo headless:

```bash
npm run cy:run
```

Executar todos os testes:

```bash
npm test
```

Executar testes de API:

```bash
npm run test:api
```

---

## Scripts disponíveis

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "cypress run",
    "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'"
  }
}
```

---

## CI/CD

O projeto pode ser executado automaticamente via **GitHub Actions**.

O workflow fica localizado em:

```text
.github/workflows/cypress-ci.yml
```

A execução pode ser configurada para rodar a cada `push` ou `pull request` na branch principal.

---

## Autor

Projeto desenvolvido por **Felipe Vilar** para fins de prática e demonstração de habilidades em automação de testes com Cypress.

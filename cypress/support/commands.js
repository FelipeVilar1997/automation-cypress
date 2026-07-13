Cypress.Commands.add('logToFile', (level, message) => {
    cy.log(`[${level}] ${message}`);

    cy.task('logToFile', {
        level,
        message
    }, { log: false })
})
Cypress.Commands.add('info', (message) => {
    cy.logToFile('INFO', message)
})
Cypress.Commands.add('errorLog', (message) => {
    cy.logToFile('ERROR', message)
})
Cypress.Commands.add('debugLog', (message) => {
    cy.logToFile('DEBUG', message)
})

Cypress.Commands.add('apiRequest', ({
    method,
    endpoint,
    body,
    form = false,
    failOnStatusCode = true
}) => {
    cy.info(`**API REQUEST:** ${method} ${endpoint}`)

    return cy.env(['apiUrl']).then(({ apiUrl }) => {
        return cy.request({
            method,
            url: `${apiUrl}${endpoint}`,
            body,
            form,
            failOnStatusCode
        }).then((response) => {
            cy.info(`**API RESPONSE:** status: ${response.status}`)
            return cy.wrap(response, { log: false })
        })
    })
})

Cypress.Commands.add('login', (email, password, userName) => {
  cy.info('Realizando login')

  cy.visit('/login')

  cy.get('[data-qa="login-email"]')
    .should('be.visible')
    .clear()
    .type(email)

  cy.get('[data-qa="login-password"]')
    .should('be.visible')
    .clear()
    .type(password, { log: false })

  cy.get('[data-qa="login-button"]')
    .should('be.visible')
    .click()

  cy.contains('a', 'Logged in as')
    .should('be.visible')
    .and('contain.text', userName)
})
Cypress.Commands.add('loginSession', (user) => {
  cy.session(
    [user.email, user.userName],
    () => {
      cy.login(user.email, user.password, user.userName)
    },
    {
      validate() { 
        // cy.visit('/');

        cy.contains('a', 'Logged in as')
          .should('be.visible')
          .and('contain.text', user.userName);
      }
    }
  )
})
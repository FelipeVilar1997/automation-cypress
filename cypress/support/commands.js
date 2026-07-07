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
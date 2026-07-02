Cypress.Commands.add('step', (message) => {
    cy.log(`**STEP:** ${message}`);
})
Cypress.Commands.add('validation', (message) => {
    cy.log(`**VALIDATION:** ${message}`)
})
Cypress.Commands.add('apiRequest', ({
    method,
    endpoint,
    body,
    form = false,
    failOnStatusCode = true
}) => {
    cy.log(`**API REQUEST:** ${method} ${endpoint}`)

    return cy.env(['apiUrl']).then(({ apiUrl }) => {
        return cy.request({
            method,
            url: `${apiUrl}${endpoint}`,
            body,
            form,
            failOnStatusCode
        }).then((response) => {
            cy.log(`**API RESPONSE:** status ${response.status}`)
            return cy.wrap(response, { log: false })
        })
    })
})
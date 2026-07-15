import { endpointsAPI } from '../support/endpointsAPI.js'

export class TrelloService {
  static getActionById(actionId) {
    return cy.apiRequest({
      method: 'GET',
      endpoint: endpointsAPI.trello.actionsById(actionId),
      failOnStatusCode: false
    })
  }

  static validateActionResponse(response) {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('list')
    expect(response.body.data.list).to.have.property('name')

    return response
  }

  static validateListName(response, expectedListName) {
    expect(response.body.data.list.name).to.eq(expectedListName)

    return response
  }
}
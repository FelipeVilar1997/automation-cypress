import { endpointsAPI } from "../../support/endpointsAPI.js";

describe('Actions Test API', () => {
    it('Buscar dados e validar status Code', () => {
        const id = 1
        const userId = '592f11060f95a3d3d46a987a'

        cy.env(['apiUrl']).then(({apiUrl}) => {
            cy.step('Chamada do endpoint');
            cy.request({
                method: 'GET',
                url: `${apiUrl}${endpointsAPI.actionsId(id, userId)}`
            }).then((response) => {
                cy.validation('Validando status code');
                expect(response.status).to.eq(200);

                cy.validation('Extrair e lista e validar nome');
                const listName = response.body.data.list.name;
                expect(listName).to.eq('Professional');
            })
        })
    })
})
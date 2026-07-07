import { TrelloService } from "../../services/TrelloService.js"

describe('Actions Test API', () => {
    it('Buscar dados e validar status Code', () => {
        const userId = '592f11060f95a3d3d46a987a'

        TrelloService.getActionById(userId).then((response) => {
            TrelloService.validateActionResponse(response)
            TrelloService.validateListName(response, 'Professional')
        })
    })
})
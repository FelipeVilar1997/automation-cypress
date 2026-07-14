export const endpointsAPI = {
    trello: {
        actions: (version = 1) => `/${version}/actions`,
        actionsById: (actionId, version = 1) => `/${version}/actions/${actionId}`
    }
}
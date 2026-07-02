export const endpointsAPI = {
    actions: (id) => `/${id}/actions`,
    actionsId: (id, userId) => `/${id}/actions/${userId}`
}
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    env:{
      apiUrl: 'https://api.trello.com'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

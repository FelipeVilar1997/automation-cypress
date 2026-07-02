const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    env:{
      apiUrl: 'https://api.trello.com'
    },
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      on('task', {
        log(message){
          console.log(message)
          return null
        }
      })
      return config
    }
  }
});

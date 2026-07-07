const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
require('dotenv').config();

const{
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const{
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],
    env:{
      apiUrl: process.env.CYPRESS_API_URL,
      headless: process.env.CYPRESS_HEADLESS,
      browser: process.env.CYPRESS_BROWSER,
      parallelism: process.env.CYPRESS_PARALLELISM
    },

    retries: {
      runMode: 2,
      openMode: 0
    },

    video: true,
    screenshotOnRunFailure: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      
      on(
        'file:preprocessor',
        createBundler({
          plugins:[createEsbuildPlugin(config)]
        })
      )

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

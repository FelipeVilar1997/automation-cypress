const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const{
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const{
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

const logsDir = path.join(__dirname, 'cypress', 'logs')
const logFile = path.join(logsDir, 'automation.log')

function toBoolean(value, defaultValue = true) {
  if (value === undefined) return defaultValue
  return value === 'true'
}

function toNumber(value, defaultValue) {
  const parsedValue = Number(value)
  return Number.isNaN(parsedValue) ? defaultValue : parsedValue
}

function ensureLogsDir() {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
  }
}

function writeLogToFile({ level = 'INFO', message }) {
  ensureLogsDir()

  const timestamp = new Date().toISOString()
  const safeMessage = typeof message === 'string'
    ? message
    : JSON.stringify(message)

  const logMessage = `[${timestamp}] [${level}] ${safeMessage}\n`

  fs.appendFileSync(logFile, logMessage)

  return null
}

module.exports = defineConfig({
  allowCypressEnv: true,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportFilename: 'report',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    timestamp: 'yyyy-mm-dd_HH-MM-ss'
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://www.automationexercise.com',

    viewportWidth: toNumber(process.env.CYPRESS_VIEWPORT_WIDTH, 1280),
    viewportHeight: toNumber(process.env.CYPRESS_VIEWPORT_HEIGHT, 720),

    defaultCommandTimeout: toNumber(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT, 10000),

    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],
    env:{
      apiUrl: process.env.CYPRESS_API_URL || 'https://api.trello.com',
      browser: process.env.CYPRESS_HEADLESS || 'chrome',
      headless: toBoolean(process.env.CYPRESS_HEADLESS, true),
      parallel: toBoolean(process.env.CYPRESS_PARALLEL, false)
    },

    retries: {
      runMode: 2,
      openMode: 0
    },

    video: toBoolean(process.env.CYPRESS_VIDEO, true),
    screenshotOnRunFailure: toBoolean(process.env.CYPRESS_SCREENSHOT_ON_FAILURE, true),

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
        },
        logToFile({ level, message }){
          return writeLogToFile({ level, message })
        },
        clearLogFile(){
          ensureLogsDir()
          fs.writeFileSync(logFile, '')
          return null
        }
      })
      return config
    }
  }
});

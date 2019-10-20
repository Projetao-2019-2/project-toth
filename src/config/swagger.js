const swagger = require('swagger-jsdoc')
const path = require('path')
const { version } = require('../../package.json')

const defs = {
  openapi: '3.0.0',
  info: {
    title: 'Toth API',
    version: `${version}`
  },
  servers: [
    {
      url: 'https://{host}/{basePath}',
      description: 'Prod server',
      variables: {
        basePath: {
          default: 'v1'
        },
        host: {
          default: ' project-toth.herokuapp.com' '
        }
      }
    },
    {
      url: 'http://{host}/{basePath}',
      description: 'Dev server',
      variables: {
        basePath: {
          default: 'v1'
        },
        host: {
          default: 'localhost:3000'
        }
      }
    }
  ]
}

const swaggerConfig = swagger({
  swaggerDefinition: defs,
  apis: [
    path.resolve(__dirname, '../controllers/v1/*.js'),
    path.resolve(__dirname, '../schemas/**/*.yaml')
  ]
})

module.exports = { swaggerConfig }

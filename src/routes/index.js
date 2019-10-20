const express = require('express')
const router = express.Router()

const swaggerUI = require('swagger-ui-express')
const { swaggerConfig: swagger } = require('../config/swagger')

const postRouter = require(`./${process.env.API_VERSION}/postRouter`)
const categoryRouter = require(`./${process.env.API_VERSION}/categoryRouter`)

router.get('/', (req, res, next) => {
  res.status(418).json({ title: '🍵' })
})

router.use(`/${process.env.API_VERSION}/posts`, postRouter)
router.use(`/${process.env.API_VERSION}/categories`, categoryRouter)

router.use(`/${process.env.API_VERSION}/swagger.json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swagger)
})

router.use(
  `/${process.env.API_VERSION}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swagger)
)

module.exports = router

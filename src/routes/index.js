const express = require('express')
const router = express.Router()

const swaggerUI = require('swagger-ui-express')
const { swaggerConfig: swagger } = require('../config/swagger')

const authRouter = require(`./${process.env.API_VERSION}/authRouter`)
const postRouter = require(`./${process.env.API_VERSION}/postRouter`)
const questionRouter = require(`./${process.env.API_VERSION}/questionRouter`)
const categoryRouter = require(`./${process.env.API_VERSION}/categoryRouter`)
const commentRouter = require(`./${process.env.API_VERSION}/commentRouter`)
const userRouter = require(`./${process.env.API_VERSION}/userRouter`)

router.get('/', (req, res, next) => {
  res.status(418).json({ title: '🍵' })
})

router.use(`/${process.env.API_VERSION}/auth`, authRouter)
router.use(`/${process.env.API_VERSION}/posts`, postRouter)
router.use(`/${process.env.API_VERSION}/questions`, questionRouter)
router.use(`/${process.env.API_VERSION}/categories`, categoryRouter)
router.use(`/${process.env.API_VERSION}/comments`, commentRouter)
router.use(`/${process.env.API_VERSION}/users`, userRouter)

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

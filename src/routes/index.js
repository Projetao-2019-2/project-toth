const express = require('express')
const router = express.Router()

const postRouter = require(`./${process.env.API_VERSION}/postRouter`)

router.get('/', (req, res, next) => {
  res.status(418).json({ title: '🍵' })
})

router.use(`/${process.env.API_VERSION}/posts`, postRouter)

module.exports = router

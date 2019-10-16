const router = require('express').Router()
const { PostController } = require('../../controllers')

router.get('/', PostController.list)

module.exports = router

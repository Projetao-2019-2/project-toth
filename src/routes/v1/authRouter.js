const router = require('express').Router()
const { AuthController } = require('../../controllers')

router.post('/', AuthController.login)

module.exports = router

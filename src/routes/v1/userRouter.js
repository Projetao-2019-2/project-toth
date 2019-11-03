const router = require('express').Router()

const { authorization } = require('../../middlewares')

const { UserController } = require('../../controllers')

router.get('/me', authorization, UserController.profile)

router.get('/', UserController.list)
router.get('/:id', UserController.view)
router.post('/', UserController.create)
router.put('/:id', authorization, UserController.update)
router.patch('/:id', authorization, UserController.update)
router.delete('/:id', authorization, UserController.delete)

module.exports = router

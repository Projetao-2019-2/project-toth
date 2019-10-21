const router = require('express').Router()

const { UserController } = require('../../controllers')

router.get('/', UserController.list)
router.get('/:id', UserController.view)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router
const router = require('express').Router()
const multer = require('multer')

const { authorization } = require('../../middlewares')

const { usersConfig } = require('../../config/multer')

const { UserController } = require('../../controllers')

router.get('/', UserController.list)
router.get('/:id', UserController.view)
router.post('/', multer(usersConfig).single('file'), UserController.create)
router.put(
  '/:id',
  authorization,
  multer(usersConfig).single('file'),
  UserController.update
)
router.patch('/:id', authorization, UserController.update)
router.delete('/:id', authorization, UserController.delete)

module.exports = router

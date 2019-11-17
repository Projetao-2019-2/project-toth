const router = require('express').Router()
const multer = require('multer')

const { authorization } = require('../../middlewares')

const { postsConfig } = require('../../config/multer')
const { PostController } = require('../../controllers')

router.get('/', PostController.list)
router.get('/:id', PostController.view)
router.get('/:id/comments', PostController.comments)
router.post(
  '/',
  authorization,
  multer(postsConfig).array('file'),
  PostController.create.bind(PostController)
)
router.put(
  '/:id',
  authorization,
  multer(postsConfig).array('file'),
  PostController.update
)
router.patch(
  '/:id',
  authorization,
  PostController.evaluate.bind(PostController)
)
router.delete('/:id', authorization, PostController.delete)

module.exports = router

const router = require('express').Router()

const { CommentController } = require('../../controllers/')

router.post('/', CommentController.create)
router.get('/', CommentController.list)
router.get('/:id', CommentController.view)
router.put('/:id', CommentController.update)
router.delete('/:id', CommentController.delete)

module.exports = router

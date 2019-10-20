const router = require('express').Router()

const { CommentController } = require('../../controllers/')

router.post('/', CommentController.CommentCreate)
router.get('/', CommentController.CommentList)
router.get('/:id', CommentController.CommentFind)
router.put('/:id', CommentController.CommentUpdate)
router.delete('/:id', CommentController.CommentDelete)

module.exports = router

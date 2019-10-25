const router = require('express').Router()

const { CommentController } = require('../../controllers/')

const { authorization } = require('../../middlewares')

router.post('/', authorization, CommentController.create)
router.get('/', CommentController.list)
router.get('/:id', CommentController.view)
router.put('/:id', authorization, CommentController.update)
router.delete('/:id', authorization, CommentController.delete)

module.exports = router

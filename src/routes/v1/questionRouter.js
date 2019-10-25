const router = require('express').Router()

const { QuestionController } = require('../../controllers')

const { authorization } = require('../../middlewares')

router.post('/', authorization, QuestionController.create)
router.get('/', QuestionController.list)
router.get('/:id', QuestionController.view)
router.put('/:id', authorization, QuestionController.update)
router.delete('/:id', authorization, QuestionController.delete)

module.exports = router

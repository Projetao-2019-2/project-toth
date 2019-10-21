const router = require('express').Router()

const { QuestionController } = require('../../controllers')

router.post('/', QuestionController.create)
router.get('/', QuestionController.list)
router.get('/:id', QuestionController.view)
router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.delete)

module.exports = router

const router = require('express').Router()

const { QuestionController } = require('../../controllers')

router.post('/', QuestionController.Create)
router.get('/', QuestionController.List)
router.get('/:id', QuestionController.Find)
router.put('/:id', QuestionController.Update)
router.delete('/:id', QuestionController.Delete)

module.exports = router
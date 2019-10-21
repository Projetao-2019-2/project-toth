const router = require('express').Router()
const { CategoryController } = require('../../controllers')

router.get('/', CategoryController.list)
router.get('/:id', CategoryController.view)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router

const router = require('express').Router()
const { CategoryController } = require('../../controllers')

const { authorization, permissions } = require('../../middlewares')

router.get('/', CategoryController.list)
router.get('/:id', CategoryController.view)
router.post('/', authorization, permissions, CategoryController.create)
router.put('/:id', authorization, permissions, CategoryController.update)
router.delete('/:id', authorization, permissions, CategoryController.delete)

module.exports = router

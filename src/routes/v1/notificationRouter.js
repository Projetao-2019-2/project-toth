const router = require('express').Router()

const { authorization } = require('../../middlewares')

const { NotificationController } = require('../../controllers')

router.get('/', NotificationController.list)
router.get('/:id', NotificationController.view)
router.post('/', NotificationController.create)
router.put('/:id', authorization, NotificationController.update)
router.patch('/:id', authorization, NotificationController.update)
router.delete('/:id', authorization, NotificationController.delete)

module.exports = router

const router = require('express').Router()

const { SMTPController } = require('../../controllers/')

const { authorization } = require('../../middlewares')

router.post('/', authorization, SMTPController.create)
router.get('/', SMTPController.list)
router.get('/:id', SMTPController.view)
router.put('/:id', authorization, SMTPController.update)
router.patch('/:id', authorization, SMTPController.update)
router.delete('/:id', authorization, SMTPController.delete)

module.exports = router

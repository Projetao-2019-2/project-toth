const router = require('express').Router()

const { AchievementsController } = require('../../controllers')

const { authorization } = require('../../middlewares')

router.post('/', authorization, AchievementsController.create)
router.get('/', AchievementsController.list)
router.get('/:id', AchievementsController.view)
router.put('/:id', authorization, AchievementsController.update)
router.delete('/:id', authorization, AchievementsController.delete)

module.exports = router
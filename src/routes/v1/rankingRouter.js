const router = require('express').Router()
const { RankingController } = require('../../controllers')

const { authorization, permissions } = require('../../middlewares')

router.get('/', RankingController.list)
router.get('/:id', RankingController.view)
router.post('/', authorization, permissions, RankingController.create)
router.put('/:id', authorization, permissions, RankingController.update)
router.delete('/:id', authorization, permissions, RankingController.delete)

module.exports = router

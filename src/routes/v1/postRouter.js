const router = require('express').Router()
const multer = require('multer')

const { postsConfig } = require('../../config/multer')
const { PostController } = require('../../controllers')

router.get('/', PostController.list)
router.get('/:id', PostController.view)
router.post('/', multer(postsConfig).array('file'), PostController.create)
router.put('/:id', multer(postsConfig).array('file'), PostController.update)
router.patch('/:id', PostController.evaluate)
router.delete('/:id', PostController.delete)

module.exports = router

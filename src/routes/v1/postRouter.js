const router = require('express').Router()
const multer = require('multer')

const { postsConfig } = require('../../config/multer')
const { PostController } = require('../../controllers')

router.get('/', PostController.list)
router.post('/', multer(postsConfig).array('file'), PostController.create)
router.delete('/:id', PostController.delete)

module.exports = router

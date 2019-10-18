const { Post, sequelize } = require('../../models')

class PostController {
  async list (req, res) {
    const posts = await Post.findAll({ include: ['files'] })

    if (!posts) {
      return res.status(500).json({ message: 'Unable to get list of posts' })
    }

    res.json({ posts })
  }

  async view (req, res) {
    const { id } = req.params
    const post = await Post.findOne({ where: { id }, include: ['files'] })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.json({ post })
  }

  async create (req, res) {
    const { files } = req
    const { texto } = req.body

    if (texto === undefined && files.length === 0) {
      return res
        .status(400)
        .json({ message: 'You must provide either a text or an image/video' })
    }

    const uploaded = files.map(file => {
      const tipo = file.mimetype.split('/')[0]

      file.path = `uploads/posts/${tipo}/${file.filename}`
      file.tipo = tipo

      return file
    })

    req.body.files = uploaded

    const post = await Post.create(req.body, { include: ['files'] })

    if (!post) {
      return res.status(500).json({ message: 'Unable to create post' })
    }

    res.status(201).json({ post })
  }

  async update (req, res) {
    const { id } = req.params
    const { files } = req
    const { texto, fileids } = req.body

    if (
      texto === undefined &&
      files.length === 0 &&
      (fileids === undefined || fileids.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: 'You must provide either a text or an image/video' })
    }

    const post = await Post.findOne({ where: { id }, include: ['files'] })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const transaction = await sequelize.transaction(async transaction => {
      await Promise.all([
        post.files.map(async file => {
          if (!fileids.includes(file.id.toString())) {
            await file.destroy({ transaction })
          }
        })
      ])

      await Promise.all([
        files.map(async file => {
          const tipo = file.mimetype.split('/')[0]

          await post.createFile(
            {
              path: `uploads/posts/${tipo}/${file.filename}`,
              tipo
            },
            { transaction }
          )
        })
      ])

      const updated = await post.update(req.body, { transaction })

      return updated
    })

    if (!transaction) {
      return res.status(500).json({ message: `Unable to update post ${id}` })
    }

    const p = await Post.findOne({ where: { id }, include: ['files'] })

    res.json({ post: p })
  }

  async delete (req, res) {
    const { id } = req.params

    const post = await Post.findOne({ where: { id } })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const affected = await post.destroy()

    if (!affected) {
      return res.status(500).json({ message: 'Unable to delete the post' })
    }

    res.json({ message: 'Post deleted successfully!' })
  }

  async evaluate (req, res) {
    const { id } = req.params
    const { increment } = req.body

    const post = await Post.findOne({ where: { id } })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await post.increment(increment)

    res.json({ post })
  }
}

module.exports = new PostController()

const { Post, PostFiles } = require('../../models')

class PostController {
  async list (req, res) {
    const posts = await Post.findAll({ include: ['files'] })

    if (!posts) {
      return res.status(500).json({ message: 'Unable to get list of posts' })
    }

    res.json({ posts })
  }

  async create (req, res) {
    const { files } = req
    const { texto } = req.body

    if (texto === undefined && files.length === 0) {
      return res
        .status(400)
        .json({ message: 'You must provide either a text or an image/video' })
    }

    const post = await Post.create(req.body)

    if (!post) {
      return res.status(500).json({ message: 'Unable to create post' })
    }

    files.forEach(async file => {
      const tipo = file.mimetype.split('/')[0]

      await PostFiles.create({
        path: `uploads/posts/${tipo}/${file.filename}`,
        tipo,
        postid: post.id
      })
    })

    res.status(201).json({ post })
  }

  async delete (req, res) {
    const { id } = req.params

    const post = await Post.findOne({ where: { id } })

    if (!post === 0) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const affected = await post.destroy()

    if (!affected) {
      return res.status(500).json({ message: 'Unable to delete the post' })
    }

    res.json({ message: 'Post deleted successfully!' })
  }
}

module.exports = new PostController()

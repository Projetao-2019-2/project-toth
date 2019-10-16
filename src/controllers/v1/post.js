const { Post, PostFiles } = require('../../models')

class PostController {
  async list (req, res) {
    const posts = await Post.findAll()

    if (!posts) {
      return res.status(500).json({ message: 'Unable to get list of posts' })
    }

    res.json({ posts })
  }
}

module.exports = new PostController()

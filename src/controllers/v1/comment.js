const { Comment } = require('../../models')

class CommentController {
  async create (req, res) {
    const comment = await Comment.create({
      author: req.body.author,
      text: req.body.text,
      score: 0
    })

    if (!comment) {
      return res.status('500').json({ message: "Couldn't create comment." })
    }

    return res.status(201).json({ comment })
  }

  async list (req, res) {
    const comments = await Comment.findAll()

    if (!comments) {
      return res.status('500').json({ message: 'No comments found.' })
    }

    res.json({ comments })
  }

  async view (req, res) {
    const { id } = req.params
    const comment = await Comment.findOne({ where: { id } })

    if (!comment) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    res.json({ comment })
  }

  async update (req, res) {
    const { id } = req.params
    const { text } = req.body

    if (text === undefined) {
      return res.status('400').json({ message: 'Comment cannot be empty.' })
    }

    const comment = await Comment.findOne({ where: { id } })

    if (!comment) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    const updated = await comment.update(req.body)

    if (!updated) return res.status('500').json({ message: 'Update failed.' })

    res.json({ comment: updated })
  }

  async delete (req, res) {
    const { id } = req.params
    const deleted = await Comment.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    return res.json('Comment deleted!')
  }
}
module.exports = new CommentController()

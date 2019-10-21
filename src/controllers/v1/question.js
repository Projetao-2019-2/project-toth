const { Question } = require('../../models')

class QuestionController {
  async create (req, res) {
    const question = await Question.create({
      text: req.body.text
    })

    if (!question) {
      return res.status(500).json({ message: 'Unable to create Question.' })
    }

    res.json({ question })
  }

  async view (req, res) {
    const { id } = req.params
    const question = await Question.findOne({ where: { id } })

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    res.json({ question })
  }

  async list (req, res) {
    const questions = await Question.findAll()

    if (!questions) {
      return res.status(500).json({ message: 'No questions found.' })
    }

    res.json({ questions })
  }

  async update (req, res) {
    const { id } = req.params
    const { text } = req.body

    if (text === undefined) {
      return res.status(400).json({ message: 'Cannot be empty.' })
    }

    const question = await Question.findOne({ where: { id } })

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const updated = await question.update(req.body)

    if (!updated) return res.status(500).json({ message: 'Update failed.' })

    res.json({ question: updated })
  }

  async delete (req, res) {
    const { id } = req.params
    const deleted = await Question.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    return res.json('Question deleted!')
  }
}
module.exports = new QuestionController()

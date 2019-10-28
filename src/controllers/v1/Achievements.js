const { Achievement } = require('../../models')

class AchievementsController {

    async create(req, res) {
        const achievement = await Achievement.create({
            text: req.body.text
        })

        if (!achievement) {
            return res.status(500).json({ message: 'Unable to create Achievement.' })
        }

        res.json({ achievement })
    }


    async view(req, res) {
        const { id } = req.params
        const achievement = await Achievement.findOne({ where: { id } })

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found.' })
        }

        res.json({ achievement })
    }


    async list(req, res) {
        const achievement = await Achievement.findAll()

        if (!achievement) {
            return res.status(500).json({ message: 'No achievements found.' })
        }

        res.json({ achievement })
    }


    async update(req, res) {
        const { id } = req.params
        const { text } = req.body

        if (text === undefined) {
            return res.status(400).json({ message: 'Cannot be empty.' })
        }

        const achievement = await Achievement.findOne({ where: { id } })

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found.' })
        }

        const updated = await achievement.update(req.body)

        if (!updated) return res.status(500).json({ message: 'Update failed.' })

        res.json({ question: updated })
    }


    async delete(req, res) {
        const { id } = req.params
        const deleted = await Achievement.destroy({ where: { id: id } })

        if (!deleted) {
            return res.status(404).json({ message: 'Achievement not found.' })
        }

        return res.json({ message: 'Achievement deleted!' })
    }
}
module.exports = new AchievementController()
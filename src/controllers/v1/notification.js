const { Notification } = require('../../models')

class NotificationController {

  async list (req, res) {
    const notifications = await Notification.findAll()

    if (!notifications) {
      return res.status(500).json({ message: 'Unable to get list of notifications' })
    }

    res.json({ notifications })
  }

  async view (req, res) {
    const { id } = req.params
    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    res.json({ notification })
  }

  async create (req, res) {
    try {
      const notification = await Notification.create(req.body)

      if (!notification) {
        return res.status(500).json({ message: 'Unable to create notification' })
      }

      res.status(201).json({ notification: notification.returnObject() })
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An account with the email informed already exists' })
    }
  }

  async update (req, res) {
    const { id } = req.params

    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    const updated = await notification.update(req.body)

    if (!updated) {
      return res.status(500).json({ message: `Unable to update notification ${id}` })
    }

    const p = await Notification.findOne({ where: { id } })

    res.json({ notification: p })
  }

  async delete (req, res) {
    const { id } = req.params

    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    const deleted = await notification.destroy()

    if (!deleted) {
      return res.status(500).json({ message: 'Unable to delete the notification' })
    }

    res.json({ message: 'Notification deleted successfully!' })
  }
}

module.exports = new NotificationController()

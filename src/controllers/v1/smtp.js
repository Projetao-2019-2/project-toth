const { SMTP } = require('../../models')

class SMTPController {
  async create (req, res) {
    const smtp = await SMTP.create({
      name: req.body.name,
      host: req.body.host,
      port: req.body.port,
      username: req.body.username,
      password: req.body.password,
    })

    if (!smtp) {
      return res.status('500').json({ message: "Couldn't create SMTP." })
    }

    return res.status(201).json({ smtp })
  }

  async list (req, res) {
    const smtp = await SMTP.findAll()

    if (!smtp) {
      return res.status('500').json({ message: 'No SMTP found.' })
    }

    res.json({ smtp })
  }

  async view (req, res) {
    const { id } = req.params
    const smtp = await SMTP.findOne({ where: { id } })

    if (!smtp) {
      return res.status('404').json({ message: 'SMTP not found.' })
    }

    res.json({ smtp })
  }

  async update (req, res) {
    const { id } = req.params
    const { text } = req.body

    if (text === undefined) {
      return res.status('400').json({ message: 'SMTP cannot be empty.' })
    }

    const smtp = await smtp.findOne({ where: { id } })

    if (!smtp) {
      return res.status('404').json({ message: 'SMTP not found.' })
    }

    const updated = await smtp.update(req.body)

    if (!updated) return res.status('500').json({ message: 'Update failed.' })

    res.json({ smtp: updated })
  }

  async delete (req, res) {
    const { id } = req.params
    const deleted = await SMTP.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status('404').json({ message: 'SMPT not found.' })
    }

    return res.json({ message: 'SMTP deleted!' })
  }
}
module.exports = new SMTPController()

const { User, sequelize } = require('../../models')

class UserController {

  //GET /users
  async list (req, res) {
    const users = await User.findAll()
  
    if (!users) {
      return res.status(500).json({ message: 'Unable to get list of users' })
    }
  
    res.json({ users })
  }

  //GET /users/:id
  async view (req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  }

  //POST /users
  async create (req, res) {
    const user = await User.create(req.body)

    if (!user) {
      return res.status(500).json({ message: 'Unable to create user' })
    }

    res.status(201).json({ user })
  }

  //PUT /users/:id
  //PATCH /users/:id
  async update (req, res) {
    const { id } = req.params

    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const updated = await user.update(req.body)

    if (!updated) {
      return res.status(500).json({ message: `Unable to update user ${id}` })
    }

    const p = await User.findOne({ where: { id } })

    res.json({ user: p })
  }

  //DELETE /users/:id
  async delete (req, res) {
    const { id } = req.params

    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const deleted = await user.destroy()

    if (!deleted) {
      return res.status(500).json({ message: 'Unable to delete the user' })
    }

    res.json({ message: 'User deleted successfully!' })
  }
}

module.exports = new UserController()
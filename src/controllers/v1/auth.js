const { User } = require('../../models')
const {
  TokenService: { generate: createToken }
} = require('../../services')

class AuthController {
  async login (req, res) {
    const { email, password } = req.body

    const user = await User.scope('withPassword').findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Wrong password' })
    }

    const token = await createToken(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.type,
        curso: user.curso,
        ies: user.ies
      },
      'nortuni'
    )

    if (!token) {
      return res
        .status(500)
        .json({ message: 'Unable to generate access token' })
    }

    res.json({ token })
  }
}

module.exports = new AuthController()

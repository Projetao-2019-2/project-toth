const { User } = require('../../models')
const {
  TokenService: { generate: createToken }
} = require('../../services')

class AuthController {
  /**
   * @swagger
   * /auth/:
   *   post:
   *     tags:
   *       - Auth
   *     description: Log in an user to the system
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - cpf
   *               - password
   *     responses:
   *       200:
   *         description: A jwt token with user information valid for a day
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT Token
   *       401:
   *         description: The user typed the wrong password
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       404:
   *         description: The user informed doesn't exists in the database
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: An error occurred generating the token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async login(req, res) {
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
        ies: user.ies,
        access: new Date(),
        expires: 86400
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

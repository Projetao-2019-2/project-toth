const { User } = require('../../models')

class UserController {
  /**
   * @swagger
   * /users:
   *  get:
   *    tags:
   *      - Users
   *    description: Returns a list with all the users
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of users
   *        schema:
   *          $ref: '#/components/schemas/BasicUsersModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                users:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicUsersModel'
   *      500:
   *        description: The server was unable to get the list of users
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list (req, res) {
    const users = await User.findAll()

    if (!users) {
      return res.status(500).json({ message: 'Unable to get list of users' })
    }

    res.json({ users })
  }

  /**
   * @swagger
   * /users/{id}:
   *  get:
   *    tags:
   *      - Users
   *    description: Returns a specific user queried by id
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      200:
   *        description: Successfully retrieves the user queried
   *        schema:
   *          $ref: '#/components/schemas/BasicUsersModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                user:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicUsersModel'
   *      404:
   *        description: The server was unable to find the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async view (req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  }

  /**
   * @swagger
   * /users:
   *  post:
   *    tags:
   *      - Users
   *    description: Creates a user instance
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              nome:
   *                type: string
   *              email:
   *                type: string
   *                format: email
   *              curso:
   *                type: string
   *              ies:
   *                type: string
   *              senha:
   *                type: string
   *                format: password
   *    responses:
   *      201:
   *        description: Successfully creates a user
   *        schema:
   *          $ref: '#/components/schemas/BasicUsersModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                user:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicUsersModel'
   *      500:
   *        description: The sever was unable to create the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create (req, res) {
    const user = await User.create(req.body)

    if (!user) {
      return res.status(500).json({ message: 'Unable to create user' })
    }

    res.status(201).json({ user })
  }

  /**
   * @swagger
   * /users/{id}:
   *  put:
   *    tags:
   *      - Users
   *    description: Updates a user instance
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              nome:
   *                type: string
   *              email:
   *                type: string
   *                format: email
   *              curso:
   *                type: string
   *              ies:
   *                type: string
   *              senha:
   *                type: string
   *                format: password
   *    responses:
   *      200:
   *        description: Successfully updates a user
   *        schema:
   *          $ref: '#/components/schemas/BasicUsersModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                user:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicUsersModel'
   *      404:
   *        description: The server was unable to find the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
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

  /**
   * @swagger
   * /users/{id}:
   *  delete:
   *    tags:
   *      - Users
   *    description: Deletes a user instance
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      200:
   *        description: Successfully deletes the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      404:
   *        description: The server was unable to find the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
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

const { User } = require('../../models')

const fs = require('fs')
const path = require('path')

const { S3Service } = require('../services')

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
  async list(req, res) {
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
  async view(req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  }

  /**
   * @swagger
   * /users/me:
   *  get:
   *    tags:
   *      - Users
   *    description: Returns information and posts of logged user
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrieves the user queried
   *        schema:
   *          $ref: '#/components/schemas/ExtendedUsersModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                user:
   *                  type: object
   *                  $ref: '#/components/schemas/ExtendedUsersModel'
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
  async profile(req, res) {
    const { id } = req.user

    const user = await User.findOne({
      where: { id },
      include: [
        { association: 'posts', include: ['files', 'category', 'question'] }
      ]
    })

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
   *              type:
   *                type: string
   *                enum: ['admin', 'undergraduate', 'highschool']
   *              password:
   *                type: string
   *                format: password
   *              facebook_link:
   *                type: string
   *              instagram_link:
   *                type: string
   *              twitter_link:
   *                type: string
   *              file:
   *                type: string
   *                format: binary
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
  async create(req, res) {
    try {
      if (req.file !== undefined) {
        req.body.image = req.file.filename
        req.body.imagepath = req.file.location
      }

      req.body.avatar = uploaded

      const user = await User.create(req.body)
      if (!user) {
        return res.status(500).json({ message: 'Unable to create user' })
      }

      res.status(201).json({ user: user.returnObject() })
    } catch (err) {
      return res.status(500).json({
        message: `An error occurred while trying to create user: ${err}`
      })
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *  put:
   *    tags:
   *      - Users
   *    description: Updates a user instance
   *    security:
   *      - bearerAuth: []
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
   *              facebook_link:
   *                type: string
   *              instagram_link:
   *                type: string
   *              twitter_link:
   *                type: string
   *              file:
   *                type: string
   *                format: binary
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
   *      401:
   *        description: Authorization information is missing or invalid.
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
   *        description: The sever was unable to update the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async update(req, res) {
    const { id } = req.params
    const { id: userid, tipo } = req.user

    if (tipo !== 'admin' && id !== userid) {
      return res.status(403).json({
        message: "You don't have permission to change this user's information"
      })
    }

    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (req.file !== undefined) {
      if (user.imagepath !== null && user.imagepath !== '') {
        try {
          if (process.env.NODE_ENV === 'prod') {
            const response = S3Service.destroy(`users/${instance.name}`)

            if (response.status === 500) {
              console.error(response.message)
            }
          } else {
            const filepath = path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              'public',
              user.imagepath
            )

            fs.unlinkSync(filepath)
          }
        } catch (err) {
          console.error(err)
        }
      }

      req.body.image = req.file.filename
      req.body.imagepath = req.file.location
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
   *    security:
   *      - bearerAuth: []
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
   *      401:
   *        description: Authorization information is missing or invalid.
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
  async delete(req, res) {
    const { id } = req.params
    const { id: userid, tipo } = req.user

    if (tipo !== 'admin' && id !== userid) {
      return res.status(403).json({
        message: "You don't have permission to delete this user"
      })
    }

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

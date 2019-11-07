const { Achievement } = require('../../models')

class AchievementsController {
  /**
   * @swagger
   * /achievements:
   *  post:
   *    tags:
   *      - Achievement  
   *    description: Creates a achievement instance
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              text:
   *                type: string
   *    responses:
   *      201:
   *        description: Successfully creates a achievement 
   *        schema:
   *          $ref: '#/components/schemas/BasicAchievementModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                question:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicAchievementModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to create the achievement
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
    async create(req, res) {
        const achievement = await Achievement.create({
            text: req.body.text
        })

        if (!achievement) {
            return res.status(500).json({ message: 'Unable to create Achievement.' })
        }

        res.json({ achievement })
    }
  /**
   * @swagger
   * /achievements/{id}:
   *  get:
   *    tags:
   *      - Achievement
   *    description: Returns a specific achievement queried by id
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
   *        description: Successfully retrieves the achievement queried
   *        schema:
   *          $ref: '#/components/schemas/BasicAchievementModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                category:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicAchievementModel'
   *      404:
   *        description: The server was unable to find the Achievement
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The server was unable to get the Achievement
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
        const achievement = await Achievement.findOne({ where: { id } })

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found.' })
        }

        res.json({ achievement })
    }

    /**
   * @swagger
   * /achievements:
   *  get:
   *    tags:
   *      -Achievement
   *    description: Returns a list with all the achievements
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of achievements
   *        schema:
   *          $ref: '#/components/schemas/BasicAchievementModel
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                questions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicAchievementModel
   *      500:
   *        description: The server was unable to get the list of achievements
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
    async list(req, res) {
        const achievement = await Achievement.findAll()

        if (!achievement) {
            return res.status(500).json({ message: 'No achievements found.' })
        }

        res.json({ achievement })
    }
  /**
   * @swagger
   * /achievements/{id}:
   *  put:
   *    tags:
   *      - Achievement
   *    description: Updates a achievement instance
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
   *              text:
   *                type: string
   *    responses:
   *      200:
   *        description: Successfully updates a achievement
   *        schema:
   *          $ref: '#/components/schemas/BasicAchievementModel
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                question:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicAchievementModel
   *      400:
   *        description: Attempt to make an empty achievement
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
   *        description: The server was unable to find the achievement
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the achievement
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

        res.json({ achievement: updated })
    }

  /**
   * @swagger
   * /achievements/{id}:
   *  delete:
   *    tags:
   *      - Achievement
   *    description: Deletes a achievement instance
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
   *        description: Successfully deletes the achievement
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
   *        description: The server was unable to find the achievement
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the achievement
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
        const deleted = await Achievement.destroy({ where: { id: id } })

        if (!deleted) {
            return res.status(404).json({ message: 'Achievement not found.' })
        }

        return res.json({ message: 'Achievement deleted!' })
    }
}
module.exports = new AchievementController()

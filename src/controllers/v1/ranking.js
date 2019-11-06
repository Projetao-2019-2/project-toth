const { Ranking } = require('../../models')

class RankingController {

  /**
   * @swagger
   * /rankings:
   *  get:
   *    tags:
   *      - Categories
   *    description: Returns a list with all the rankings
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of comments
   *        schema:
   *          $ref: '#/components/schemas/BasicRankingModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                rankings:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicRankingModel'
   *      500:
   *        description: The server was unable to get the list of rankings
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list (req, res) {
    try {
      const rankings = await Ranking.findAll()
      return res.status(200).json({ rankings })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /rankings:
   *  post:
   *    tags:
   *      - Categories
   *    description: Creates a ranking instance
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
   *              name:
   *                type: string
   *              description:
   *                type: string
   *              color:
   *                type: string
   *    responses:
   *      201:
   *        description: Successfully creates a ranking
   *        schema:
   *          $ref: '#/components/schemas/BasicRankingModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                ranking:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicRankingModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to create the ranking
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */

  async view (req, res) {
    try {
      const { id } = req.params
      const Ranking = await Ranking.findOne({
        where: { id: id }
      })
      if (Ranking) {
        return res.status(200).json({ Ranking })
      }
      return res.status(404).json({ message: 'Ranking not found' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /rankings:
   *  post:
   *    tags:
   *      - Categories
   *    description: Creates a ranking instance
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
   *              name:
   *                type: string
   *              description:
   *                type: string
   *              color:
   *                type: string
   *    responses:
   *      201:
   *        description: Successfully creates a ranking
   *        schema:
   *          $ref: '#/components/schemas/BasicRankingModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                ranking:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicRankingModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to create the ranking
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */

  async create (req, res) {
    try {
      const Ranking = await Ranking.create(req.body)
      return res.status(201).json({
        Ranking
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /rankings/{id}:
   *  put:
   *    tags:
   *      - Categories
   *    description: Updates a ranking instance
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
   *              name:
   *                type: string
   *              description:
   *                type: string
   *              color:
   *                type: string
   *    responses:
   *      200:
   *        description: Successfully updates a ranking
   *        schema:
   *          $ref: '#/components/schemas/BasicRankingModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                ranking:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicRankingModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the ranking
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */

  async update (req, res) {
    try {
      const { id } = req.params
      const [updated] = await Ranking.update(req.body, {
        where: { id: id }
      })
      if (updated) {
        const updatedRanking = await Ranking.findOne({ where: { id: id } })
        return res.status(200).json({ Ranking: updatedRanking })
      }
      throw new Error('Ranking not found')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /rankings/{id}:
   *  delete:
   *    tags:
   *      - Rankings
   *    description: Deletes a ranking instance
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
   *        description: Successfully deletes the ranking
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
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the ranking
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */

  async delete (req, res) {
    try {
      const { id } = req.params
      const deleted = await Ranking.destroy({
        where: { id: id }
      })
      if (deleted) {
        return res.json({ message: 'Ranking deleted' })
      }
      throw new Error('Ranking not found')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
module.exports = new RankingController()

const { Ranking, sequelize } = require('../../models')

class RankingController {
  /**
   * @swagger
   * /ranking:
   *  get:
   *    tags:
   *      - Ranking
   *    description: Returns the users ranking
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the ranking
   *        schema:
   *          $ref: '#/components/schemas/ExtendedRankingModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                curso_ies:
   *                  type: string
   *                my_position:
   *                  type: integer
   *                my_points:
   *                  type: integer
   *                rankings:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/ExtendedRankingModel'
   *      500:
   *        description: The server was unable to get the ranking
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list(req, res) {
    const { id, curso, ies } = req.user

    try {
      const rankings = await Ranking.findAll({
        where: { type: `${curso} - ${ies}` },
        order: [['points', 'DESC']],
        include: ['user']
      })

      const myEntry = rankings.find(item => item.userid === id)

      return res.status(200).json({
        curso_ies: `${curso} - ${ies}`,
        my_position: rankings.findIndex(item => item.userid === id) + 1,
        my_points: myEntry.points,
        rankings
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  async view(req, res) {
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

  async create(req, res) {
    try {
      const Ranking = await Ranking.create(req.body)
      return res.status(201).json({
        Ranking
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  async update(req, res) {
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

  async delete(req, res) {
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

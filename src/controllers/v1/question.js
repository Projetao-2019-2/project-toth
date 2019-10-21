const { Question } = require('../../models')

class QuestionController {
  /**
   * @swagger
   * /questions:
   *  post:
   *    tags:
   *      - Questions
   *    description: Creates a question instance
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
   *        description: Successfully creates a question
   *        schema:
   *          $ref: '#/components/schemas/BasicQuestionModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                question:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicQuestionModel'
   *      500:
   *        description: The sever was unable to create the question
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create (req, res) {
    const question = await Question.create({
      text: req.body.text
    })

    if (!question) {
      return res.status(500).json({ message: 'Unable to create Question.' })
    }

    res.json({ question })
  }

  /**
   * @swagger
   * /questions/{id}:
   *  get:
   *    tags:
   *      - Questions
   *    description: Returns a specific question queried by id
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
   *        description: Successfully retrieves the question queried
   *        schema:
   *          $ref: '#/components/schemas/BasicQuestionModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                question:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicQuestionModel'
   *      404:
   *        description: The server was unable to find the question
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
    const question = await Question.findOne({ where: { id } })

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    res.json({ question })
  }

  /**
   * @swagger
   * /questions:
   *  get:
   *    tags:
   *      - Questions
   *    description: Returns a list with all the questions
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of questions
   *        schema:
   *          $ref: '#/components/schemas/BasicQuestionModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                questions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicQuestionModel'
   *      500:
   *        description: The server was unable to get the list of questions
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list (req, res) {
    const questions = await Question.findAll()

    if (!questions) {
      return res.status(500).json({ message: 'No questions found.' })
    }

    res.json({ questions })
  }

  /**
   * @swagger
   * /questions/{id}:
   *  put:
   *    tags:
   *      - Questions
   *    description: Updates a question instance
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
   *        description: Successfully updates a question
   *        schema:
   *          $ref: '#/components/schemas/BasicQuestionModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                question:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicQuestionModel'
   *      400:
   *        description: Attempt to make an empty question
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      404:
   *        description: The server was unable to find the question
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the question
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
    const { text } = req.body

    if (text === undefined) {
      return res.status(400).json({ message: 'Cannot be empty.' })
    }

    const question = await Question.findOne({ where: { id } })

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    const updated = await question.update(req.body)

    if (!updated) return res.status(500).json({ message: 'Update failed.' })

    res.json({ question: updated })
  }

  /**
   * @swagger
   * /questions/{id}:
   *  delete:
   *    tags:
   *      - Questions
   *    description: Deletes a question instance
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
   *        description: Successfully deletes the question
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      404:
   *        description: The server was unable to find the question
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the question
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
    const deleted = await Question.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status(404).json({ message: 'Question not found.' })
    }

    return res.json({ message: 'Question deleted!' })
  }
}
module.exports = new QuestionController()

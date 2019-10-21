const { Comment } = require('../../models')

class CommentController {
  /**
   * @swagger
   * /comments:
   *  post:
   *    tags:
   *      - Comments
   *    description: Creates a comment instance
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              author:
   *                type: string
   *              text:
   *                type: string
   *    responses:
   *      201:
   *        description: Successfully creates a comment
   *        schema:
   *          $ref: '#/components/schemas/BasicCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comment:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCommentModel'
   *      500:
   *        description: The sever was unable to create the comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create (req, res) {
    const comment = await Comment.create({
      author: req.body.author,
      text: req.body.text,
      score: 0
    })

    if (!comment) {
      return res.status('500').json({ message: "Couldn't create comment." })
    }

    return res.status(201).json({ comment })
  }

  /**
   * @swagger
   * /comments:
   *  get:
   *    tags:
   *      - Comments
   *    description: Returns a list with all the comments
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of comments
   *        schema:
   *          $ref: '#/components/schemas/BasicCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comments:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicCommentModel'
   *      500:
   *        description: The server was unable to get the list of comments
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list (req, res) {
    const comments = await Comment.findAll()

    if (!comments) {
      return res.status('500').json({ message: 'No comments found.' })
    }

    res.json({ comments })
  }

  /**
   * @swagger
   * /comments/{id}:
   *  get:
   *    tags:
   *      - Comments
   *    description: Returns a specific comment queried by id
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
   *        description: Successfully retrieves the comment queried
   *        schema:
   *          $ref: '#/components/schemas/BasicCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comment:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCommentModel'
   *      404:
   *        description: The server was unable to find the comment
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
    const comment = await Comment.findOne({ where: { id } })

    if (!comment) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    res.json({ comment })
  }

  /**
   * @swagger
   * /comments/{id}:
   *  put:
   *    tags:
   *      - Comments
   *    description: Updates a comment instance
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
   *        description: Successfully updates a comment
   *        schema:
   *          $ref: '#/components/schemas/BasicCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comment:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCommentModel'
   *      400:
   *        description: Attempt to make an empty comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      404:
   *        description: The server was unable to find the comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the comment
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
      return res.status('400').json({ message: 'Comment cannot be empty.' })
    }

    const comment = await Comment.findOne({ where: { id } })

    if (!comment) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    const updated = await comment.update(req.body)

    if (!updated) return res.status('500').json({ message: 'Update failed.' })

    res.json({ comment: updated })
  }

  /**
   * @swagger
   * /comments/{id}:
   *  delete:
   *    tags:
   *      - Comments
   *    description: Deletes a comment instance
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
   *        description: Successfully deletes the comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      404:
   *        description: The server was unable to find the comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the comment
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
    const deleted = await Comment.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    return res.json({ message: 'Comment deleted!' })
  }
}
module.exports = new CommentController()

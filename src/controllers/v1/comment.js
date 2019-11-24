const { Comment, Notification, Post, Ranking } = require('../../models')

class CommentController {
  /**
   * @swagger
   * /comments:
   *  post:
   *    tags:
   *      - Comments
   *    description: Creates a comment instance
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
   *              userid:
   *                type: integer
   *              postid:
   *                type: integer
   *              parentid:
   *                type: integer
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
   *        description: The sever was unable to create the comment
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create(req, res) {
    const { id: userid, nome } = req.user

    req.body.userid = userid

    const comment = await Comment.create(req.body)

    if (!comment) {
      return res.status('500').json({ message: "Couldn't create comment." })
    }

    const post = await Post.findOne({ where: { id: req.body.postid } })

    if (post) {
      if (userid !== post.userid) {
        await Notification.create({
          texto: `${nome} comentou na sua postagem.`,
          link: `posts/${post.id}`,
          userid: post.userid
        })
      }

      if (req.body.parentid) {
        const parent = await Comment.findOne({
          where: { id: req.body.parentid }
        })

        if (parent) {
          if (userid !== parent.userid) {
            await Notification.create({
              texto: `${nome} respondeu seu comentário.`,
              link: `posts/${parent.postid}`,
              userid: parent.userid
            })
          }
        }
      }
    }

    await this.increase(req.user)

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
   *          $ref: '#/components/schemas/ExtendedCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comments:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/ExtendedCommentModel'
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
  async list(req, res) {
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
   *          $ref: '#/components/schemas/ExtendedCommentModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                comment:
   *                  type: object
   *                  $ref: '#/components/schemas/ExtendedCommentModel'
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
  async view(req, res) {
    const { id } = req.params
    const comment = await Comment.findOne({
      where: { id },
      include: ['post', 'author', 'parent', 'children']
    })

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
  async update(req, res) {
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
   *        description: Successfully deletes the comment
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
  async delete(req, res) {
    const { id } = req.params
    const deleted = await Comment.destroy({ where: { id: id } })

    if (!deleted) {
      return res.status('404').json({ message: 'Comment not found.' })
    }

    return res.json({ message: 'Comment deleted!' })
  }

  async increase(user) {
    const ranking = await Ranking.findOne({ where: { userid: user.id } })

    if (!ranking) {
      await Ranking.create({
        userid: user.id,
        type: `${user.curso} - ${user.ies}`,
        points: 1
      })
    } else {
      await ranking.increment('points')
    }
  }
}
module.exports = new CommentController()

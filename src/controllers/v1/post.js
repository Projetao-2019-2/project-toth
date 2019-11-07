const {
  Comment,
  Post,
  User,
  Question,
  Ranking,
  sequelize
} = require('../../models')

class PostController {
  /**
   * @swagger
   * /posts:
   *  get:
   *    tags:
   *      - Posts
   *    description: Returns a list with all posts
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: search
   *        in: query
   *        schema:
   *          type: string
   *        description: Text (course/ies) searched by the user
   *      - name: tema
   *        in: query
   *        schema:
   *          type: string
   *        description: Themes (categories) ids separated by comma (,) for filtering post results
   *      - name: pag
   *        in: query
   *        schema:
   *          type: string
   *        description: Page number for pagination
   *    responses:
   *      200:
   *        description: Successfully retrives the list of posts
   *        schema:
   *          $ref: '#/components/schemas/ExtendedPostModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                posts:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/ExtendedPostModel'
   *      500:
   *        description: The server was unable to get the list of posts
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list(req, res) {
    const { search, tema, pag = 1 } = req.query
    const pageSize = 30
    const offset = (pag - 1) * pageSize
    const limit = offset + pageSize

    let query = true
    let where = {}
    let posts = []

    if (tema) {
      where.categoryid = tema.split(',')
    }

    if (search !== undefined) {
      let query = search.split('-')

      query = query.map(term => {
        if (term.trim() !== '') {
          return term.trim().replace(/\s+/g, '<->')
        }
      })

      const fts = await sequelize.query(
        `SELECT p.* FROM ${Post.tableName} p
        LEFT JOIN ${User.tableName} u ON p.userid = u.id
        LEFT JOIN ${Question.tableName} q ON p.questionid = q.id
        WHERE p._search @@ to_tsquery('Portuguese', :query) OR
        u._search @@ to_tsquery('Portuguese', :query) OR
        q._search @@ to_tsquery('Portuguese', :query);`,
        { model: Post, replacements: { query: query.join('|') } }
      )
      //search.replace(/\s+/g, '|')

      if (fts.length > 0) {
        where.id = fts.map(item => item.id)
      } else {
        query = false
      }
    }

    if (query) {
      posts = await Post.findAll({
        limit,
        offset,
        where,
        order: [['util', 'DESC'], ['n_util', 'ASC'], ['id', 'DESC']],
        include: ['files', 'author', 'category', 'question']
      })
    }

    if (!posts) {
      return res.status(500).json({ message: 'Unable to get list of posts' })
    }

    res.json({ posts })
  }

  /**
   * @swagger
   * /posts/{id}:
   *  get:
   *    tags:
   *      - Posts
   *    description: Returns a specific post queried by id
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
   *        description: Successfully retrieves the post queried
   *        schema:
   *          $ref: '#/components/schemas/ExtendedPostViewModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                post:
   *                  type: object
   *                  $ref: '#/components/schemas/ExtendedPostViewModel'
   *      404:
   *        description: The server was unable to find the post
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
    const post = await Post.findOne({
      where: { id },
      include: ['files', 'author', 'category', 'question', 'comments']
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.json({ post })
  }

  /**
   * @swagger
   * /posts/{id}/comments:
   *  get:
   *    tags:
   *      - Posts
   *    description: Returns the comments of a specific post queried by id
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *      - name: pag
   *        in: query
   *        schema:
   *          type: string
   *        description: Page number for pagination
   *    responses:
   *      200:
   *        description: Successfully the comments of retrieves the post queried
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
   *        description: The server was unable to find the post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async comments(req, res) {
    const { id } = req.params
    const { pag = 1 } = req.query
    const pageSize = 30
    const offset = (pag - 1) * pageSize
    const limit = offset + pageSize

    const comments = await Comment.findAll({
      offset,
      limit,
      where: { postid: id },
      include: ['author']
    })

    if (!comments) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.json({ comments })
  }

  /**
   * @swagger
   * /posts:
   *  post:
   *    tags:
   *      - Posts
   *    description: Creates a post instance
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              texto:
   *                type: string
   *              categoryid:
   *                type: integer
   *              questionid:
   *                type: integer
   *              file:
   *                type: array
   *                items:
   *                  type: string
   *                  format: binary
   *            required:
   *              - categoryid
   *    responses:
   *      201:
   *        description: Successfully creates a post
   *        schema:
   *          $ref: '#/components/schemas/ExtendedPostModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                post:
   *                  type: object
   *                  $ref: '#/components/schemas/ExtendedPostModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        description: Attempt to create an empty post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to create the post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create(req, res) {
    const { files } = req
    const { texto } = req.body
    const { id: userid } = req.user

    if (texto === undefined && files.length === 0) {
      return res
        .status(400)
        .json({ message: 'You must provide either a text or an image/video' })
    }

    if (req.body.categoryid === undefined || req.body.categoryid === '') {
      return res
        .status(400)
        .json({ message: 'You must provide the category of the post' })
    }

    req.body.questionid =
      req.body.questionid === undefined || req.body.questionid === ''
        ? null
        : req.body.questionid

    const uploaded = files.map(file => {
      const tipo = file.mimetype.split('/')[0]

      file.name = file.filename
      file.path = file.location
      file.tipo = tipo

      return file
    })

    req.body.files = uploaded
    req.body.userid = userid

    const post = await Post.create(req.body, { include: ['files'] })

    if (!post) {
      return res.status(500).json({ message: 'Unable to create post' })
    }

    await this.increase(req.user)

    res.status(201).json({ post })
  }

  /**
   * @swagger
   * /posts/{id}:
   *  put:
   *    tags:
   *      - Posts
   *    description: Updates a post instance
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
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              texto:
   *                type: string
   *              fileids:
   *                type: array
   *                description: The ids of the already existing files in the post
   *                items:
   *                  type: integer
   *              file:
   *                type: array
   *                items:
   *                  type: string
   *                  format: binary
   *    responses:
   *      200:
   *        description: Successfully updates a post
   *        schema:
   *          $ref: '#/components/schemas/ExtendedPostModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                post:
   *                  type: object
   *                  $ref: '#/components/schemas/ExtendedPostModel'
   *      400:
   *        description: Attempt to make an empty post
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
   *        description: The server was unable to find the post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the post
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
    const { files } = req
    const { texto, fileids } = req.body

    if (
      texto === undefined &&
      files.length === 0 &&
      (fileids === undefined || fileids.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: 'You must provide either a text or an image/video' })
    }

    const post = await Post.findOne({ where: { id }, include: ['files'] })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const transaction = await sequelize.transaction(async transaction => {
      await Promise.all([
        post.files.map(async file => {
          if (fileids === undefined || !fileids.includes(file.id.toString())) {
            await file.destroy({ transaction })
          }
        })
      ])

      await Promise.all([
        files.map(async file => {
          const tipo = file.mimetype.split('/')[0]

          await post.createFile(
            {
              name: file.filename,
              path: file.location,
              tipo
            },
            { transaction }
          )
        })
      ])

      const updated = await post.update(req.body, { transaction })

      return updated
    })

    if (!transaction) {
      return res.status(500).json({ message: `Unable to update post ${id}` })
    }

    const p = await Post.findOne({ where: { id }, include: ['files'] })

    res.json({ post: p })
  }

  /**
   * @swagger
   * /posts/{id}:
   *  delete:
   *    tags:
   *      - Posts
   *    description: Deletes a post instance
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
   *        description: Successfully deletes the post
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
   *        description: The server was unable to find the post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the post
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

    const post = await Post.findOne({ where: { id } })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const affected = await post.destroy()

    if (!affected) {
      return res.status(500).json({ message: 'Unable to delete the post' })
    }

    res.json({ message: 'Post deleted successfully!' })
  }

  /**
   * @swagger
   * /posts/{id}:
   *  patch:
   *    tags:
   *      - Posts
   *    description: Evaluates a post instance in useful or not
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
   *              increments:
   *                type: string
   *                enum:
   *                  - util
   *                  - n_util
   *    responses:
   *      200:
   *        description: Successfully evaluates a post
   *        schema:
   *          $ref: '#/components/schemas/BasicPostModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                post:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicPostModel'
   *      404:
   *        description: The server was unable to find the post
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async evaluate(req, res) {
    const { id } = req.params
    const { increment } = req.body

    const post = await Post.findOne({ where: { id }, include: ['author'] })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await post.increment(increment)

    if (increment === 'n_util') {
      await this.decrease(post.author)
    } else {
      await this.increase(post.author)
    }

    res.json({ post })
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

  async decrease(user) {
    const ranking = await Ranking.findOne({ where: { userid: user.id } })

    if (!ranking) {
      await Ranking.create({
        userid: user.id,
        type: `${user.curso} - ${user.ies}`,
        points: 0
      })
    } else {
      if (ranking.points > 0) {
        await ranking.decrement('points')
      }
    }
  }
}

module.exports = new PostController()

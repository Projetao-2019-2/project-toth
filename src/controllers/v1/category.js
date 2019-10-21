const { Category } = require('../../models')

class CategoryController {
  /**
   * @swagger
   * /categories:
   *  get:
   *    tags:
   *      - Categories
   *    description: Returns a list with all the categories
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of comments
   *        schema:
   *          $ref: '#/components/schemas/BasicCategoryModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                categories:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicCategoryModel'
   *      500:
   *        description: The server was unable to get the list of categories
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
      const categories = await Category.findAll()
      return res.status(200).json({ categories })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /categories/{id}:
   *  get:
   *    tags:
   *      - Categories
   *    description: Returns a specific category queried by id
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
   *        description: Successfully retrieves the category queried
   *        schema:
   *          $ref: '#/components/schemas/BasicCategoryModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                category:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCategoryModel'
   *      404:
   *        description: The server was unable to find the category
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The server was unable to get the category
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
      const category = await Category.findOne({
        where: { id: id }
      })
      if (category) {
        return res.status(200).json({ category })
      }
      return res.status(404).json({ message: 'Category not found' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /categories:
   *  post:
   *    tags:
   *      - Categories
   *    description: Creates a category instance
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
   *              color:
   *                type: string
   *    responses:
   *      201:
   *        description: Successfully creates a category
   *        schema:
   *          $ref: '#/components/schemas/BasicCategoryModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                category:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCategoryModel'
   *      500:
   *        description: The sever was unable to create the category
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
      const category = await Category.create(req.body)
      return res.status(201).json({
        category
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /categories/{id}:
   *  put:
   *    tags:
   *      - Categories
   *    description: Updates a category instance
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
   *        description: Successfully updates a category
   *        schema:
   *          $ref: '#/components/schemas/BasicCategoryModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                category:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicCategoryModel'
   *      500:
   *        description: The sever was unable to update the category
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
      const [updated] = await Category.update(req.body, {
        where: { id: id }
      })
      if (updated) {
        const updatedCategory = await Category.findOne({ where: { id: id } })
        return res.status(200).json({ category: updatedCategory })
      }
      throw new Error('Category not found')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /**
   * @swagger
   * /categories/{id}:
   *  delete:
   *    tags:
   *      - Categories
   *    description: Deletes a category instance
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
   *        description: Successfully deletes the category
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the category
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
      const deleted = await Category.destroy({
        where: { id: id }
      })
      if (deleted) {
        return res.json({ message: 'Category deleted' })
      }
      throw new Error('Category not found')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
module.exports = new CategoryController()

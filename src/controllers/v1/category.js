const { Category } = require('../../models')

class CategoryController {
  async list (req, res) {
    try {
      const categories = await Category.findAll()
      return res.status(200).json({ categories })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async view (req, res) {
    try {
      const { id } = req.params
      const category = await Category.findOne({
        where: { id: id }
      })
      if (category) {
        return res.status(200).json({ category })
      }
      return res.status(404).json('Category not found')
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async create (req, res) {
    try {
      const category = await Category.create(req.body)
      return res.status(201).json({
        category
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

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
      return res.status(500).json(error.message)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const deleted = await Category.destroy({
        where: { id: id }
      })
      if (deleted) {
        return res.json('Category deleted')
      }
      throw new Error('Category not found')
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
module.exports = new CategoryController()

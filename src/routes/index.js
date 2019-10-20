const express = require('express')
const router = express.Router()

const swaggerUI = require('swagger-ui-express')
const { swaggerConfig: swagger } = require('../config/swagger')

const postRouter = require(`./${process.env.API_VERSION}/postRouter`)

const models = require('../models')

router.get('/', (req, res, next) => {
  res.status(418).json({ title: '🍵' })
})

app.get('/categories', (req, res) => {
  models.Category.findAll()
    .then( categories => {
      res.json(categories);
    });
});

app.get('/categories/:id', (req, res) => {
  const id = req.params.id;
  models.Category.find({
    where: { id: id }
  })
    .then(categories => {
      res.json(categories);
    });
});

app.post('/categories', (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  models.Category.create({
    name: name,
    color: color
  })
    .then(newCategory => {
      res.json(newCategory);
    })
});

app.put('/categories/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body.updates;
  models.Category.find({
    where: { id: id }
  })
    .then(category => {
      return category.updateAttributes(updates)
    })
    .then(updatedCategory => {
      res.json(updatedCategory);
    });
});

app.delete('/categories/:id', (req, res) => {
  const id = req.params.id;
  models.Category.destroy({
    where: { id: id }
  })
    .then(deletedCategory => {
      res.json(deletedCategory);
    });
});

router.use(`/${process.env.API_VERSION}/posts`, postRouter)

router.use(`/${process.env.API_VERSION}/swagger.json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swagger)
})

router.use(
  `/${process.env.API_VERSION}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swagger)
)

module.exports = router

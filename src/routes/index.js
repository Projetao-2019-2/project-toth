const express = require('express')
const router = express.Router()

const swaggerUI = require('swagger-ui-express')
const { swaggerConfig: swagger } = require('../config/swagger')

const postRouter = require(`./${process.env.API_VERSION}/postRouter`)

router.get('/', (req, res, next) => {
  res.status(418).json({ title: '🍵' })
})

router.get('/users', (req, res, next) => {
  User.findAll().then( users => {
    res.send(users);
  });

});

router.post('/users/new', (req, res, next) => {
  User.create({
    nome: req.body.nome,
    email: req.body.email,
    curso: req.body.curso,
    ies: req.body.ies,
    senha: req.body.senha
  }).then( user => {
    res.send('Usuário criado');
  })
});

router.get('/users/:id', (req, res, next) => {
  let user_id = req.params.id

  User.findOne({ where: {id: user_id} }).then( user => {
    res.json(user);
  })
});

router.put('/users/:id', (req, res, next) => {
  let user_id = req.params.id

  User.findOne({ where: { id: user_id }}).then( user => {
    user.update(req.body).then( updated_user => {
      res.json(updated_user);
    });
  });
});

router.delete('/users/:id', (req, res, next) => {
  let user_id = req.params.id

  User.destroy({ where: {id: user_id} }).then( () => {
    res.send("Usuário excluído")
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

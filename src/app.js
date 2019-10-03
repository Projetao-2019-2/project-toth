const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(
  bodyParser.json({
    limit: '5mb'
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes'))

module.exports = app

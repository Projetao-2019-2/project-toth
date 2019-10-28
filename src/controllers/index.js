const AuthController = require(`./${process.env.API_VERSION}/auth`)
const PostController = require(`./${process.env.API_VERSION}/post`)
const QuestionController = require(`./${process.env.API_VERSION}/question`)
const CategoryController = require(`./${process.env.API_VERSION}/category`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)
const UserController = require(`./${process.env.API_VERSION}/user`)
const SMTPController = require(`./${process.env.API_VERSION}/smtp`)

module.exports = {
  AuthController,
  PostController,
  QuestionController,
  CategoryController,
  CommentController,
  UserController,
  SMTPController
}

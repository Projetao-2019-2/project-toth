const AuthController = require(`./${process.env.API_VERSION}/auth`)
const PostController = require(`./${process.env.API_VERSION}/post`)
const QuestionController = require(`./${process.env.API_VERSION}/question`)
const CategoryController = require(`./${process.env.API_VERSION}/category`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)
const UserController = require(`./${process.env.API_VERSION}/user`)
const NotificationController = require(`./${process.env.API_VERSION}/notification`)
const RankingController = require(`./${process.env.API_VERSION}/ranking`)

module.exports = {
  AuthController,
  PostController,
  QuestionController,
  CategoryController,
  CommentController,
  UserController,
  NotificationController,
  RankingController
}

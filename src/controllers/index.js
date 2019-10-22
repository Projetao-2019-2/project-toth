const PostController = require(`./${process.env.API_VERSION}/post`)
const QuestionController = require(`./${process.env.API_VERSION}/question`)
const CategoryController = require(`./${process.env.API_VERSION}/category`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)
const UserController = require(`./${process.env.API_VERSION}/user`)

module.exports = { PostController, QuestionController, CategoryController, CommentController, UserController }

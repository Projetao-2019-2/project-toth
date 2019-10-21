const PostController = require(`./${process.env.API_VERSION}/post`)
const CategoryController = require(`./${process.env.API_VERSION}/category`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)
const UserController = require(`./${process.env.API_VERSION}/user`)

module.exports = { PostController, CategoryController, CommentController, UserController }

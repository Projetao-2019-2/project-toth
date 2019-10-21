const PostController = require(`./${process.env.API_VERSION}/post`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)
const UserController = require(`./${process.env.API_VERSION}/user`)

module.exports = { PostController, CommentController, UserController }

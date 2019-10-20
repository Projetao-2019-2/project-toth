const PostController = require(`./${process.env.API_VERSION}/post`)
const CommentController = require(`./${process.env.API_VERSION}/comment`)

module.exports = { PostController, CommentController }

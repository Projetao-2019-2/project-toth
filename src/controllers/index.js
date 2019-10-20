const PostController = require(`./${process.env.API_VERSION}/post`)
const QuestionController = require(`./${process.env.API_VERSION}/comment`)

module.exports = { PostController }
module.exports = { PostController, QuestionController }

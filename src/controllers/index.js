const PostController = require(`./${process.env.API_VERSION}/post`)
const QuestionController = require(`./${process.env.API_VERSION}/question`)

module.exports = { PostController, QuestionController }

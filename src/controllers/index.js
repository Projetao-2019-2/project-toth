const PostController = require(`./${process.env.API_VERSION}/post`)
const UserController = require(`./${process.env.API_VERSION}/user`)

module.exports = { PostController, UserController }

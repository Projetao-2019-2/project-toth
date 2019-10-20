const PostController = require(`./${process.env.API_VERSION}/post`)
const CategoryController = require(`./${process.env.API_VERSION}/category`)
module.exports = { PostController, CategoryController }

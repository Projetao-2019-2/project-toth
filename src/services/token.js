const jwt = require('jsonwebtoken')

class TokenService {
  async verify (token, key) {
    try {
      const obj = await jwt.verify(token, key)

      return { status: 200, obj: obj, message: '' }
    } catch (err) {
      return { status: 401, obj: null, message: err.message }
    }
  }

  async generate (content, key) {
    return jwt.sign(content, key)
  }
}

module.exports = new TokenService()

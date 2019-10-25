const {
  TokenService: { verify: verifyToken }
} = require('../services')

module.exports = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (!token) {
    return res.status(401).send({ message: 'Token not provided' })
  }

  const decoded = await verifyToken(token, 'nortuni')

  if (decoded.status !== 200) {
    return res.status(decoded.status).send({ message: decoded.message })
  }

  const { access, expires } = decoded.obj
  const now = new Date()

  if (Math.abs(now.getTime() - access.getTime()) > expires) {
    return res.status(401).send({ message: 'Token expired' })
  }

  const user = decoded.obj

  req.user = user

  next()
}

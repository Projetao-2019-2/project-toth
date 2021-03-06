module.exports = (req, res, next) => {
  if (req.user && req.user.tipo === 'admin') {
    next()
  } else {
    res.status(403).json({
      message: 'Only administrators have permission to do this request'
    })
  }
}

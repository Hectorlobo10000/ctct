const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token')
  if(!token) return res.status(400).send({ errorMessage: 'Access denied. No token provided.' })

  try {
    const decoded = jwt.verify(token, 'jwtPrivateKeyCTCT')
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send({ errorMessage: 'Invalid token.' })
  }
}
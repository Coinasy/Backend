const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization
  let token
  if (header) token = header.split(' ')[1]
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) return res.status(401).json({ errors: 'Failed to authenticate' })
      return decodedToken
    })
  } else res.status(403).json({ errors: 'No tokens specified' })
}

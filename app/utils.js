const jwt = require('jsonwebtoken')

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      res.status(500).json({
        error: "Internal Server Error",
      })
    })
  }
}

exports.generateCode = () => {
  return 50000 + Math.floor(Math.random() * 9999)
}

exports.auth =  (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      req.userId = decoded._id
      next()
    } catch (err) {
      return res.status(403).json({
        'message': 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      'message': 'Нет доступа',
    })
  }
}

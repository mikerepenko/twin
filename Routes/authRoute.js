const authController = require('../Controllers/authController')

module.exports = function(app) {
  app.post('/login', authController.login)
  app.post('/register', authController.register)
}
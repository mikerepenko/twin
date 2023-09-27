const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

module.exports = function(app) {
  userRoutes(app)
  authRoutes(app)
}
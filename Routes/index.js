const userRoute = require('./userRoute')
const authRoute = require('./authRoute')
const twinRoute = require('./twinRoute')
const chatRoute = require('./chatRoute')
const messageRoute = require('./messageRoute')

module.exports = (app) => {
  userRoute(app)
  authRoute(app)
  twinRoute(app)
  chatRoute(app)
  messageRoute(app)
}
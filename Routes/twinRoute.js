const twinController = require('../Controllers/twinController')

module.exports = (app) => {
  app.post('/like', twinController.like)
  app.post('/dislike', twinController.dislike)
  app.get('/twins', twinController.getTwins)
}
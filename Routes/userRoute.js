const userController = require('../Controllers/userController.js')
const { saveFile } = require('../utils.js')

module.exports = (app) => {
  app.get('/users:id?', userController.getUsers)
  app.get('/user:id?', userController.getUser)
  app.post('/user', saveFile, userController.editUser)
}
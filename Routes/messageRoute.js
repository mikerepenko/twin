const messageController = require('../Controllers/messageController')

module.exports = (app) => {
  app.post('/message', messageController.createMessage)
  app.get('/messages:chatId?', messageController.getMessages)
  app.get('/last-message:chatId?', messageController.getLastMessage)
}
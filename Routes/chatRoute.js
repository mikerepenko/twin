const chatController = require('../Controllers/chatController')

module.exports = (app) => {
  app.post('/chat', chatController.createChat)
  app.get('/chats:userId?', chatController.getChats)
  app.get('/chat:firstId?&secondId?', chatController.getChat)
  app.delete('/chat:chatId?', chatController.deleteChat)
}
const chatModel       = require('../Models/chatModel.js')
const { catchErrors } = require('../utils.js')

exports.createChat = catchErrors(async (req, res) => {
  try {
    const { firstId, secondId } = req.body

    const chat = await chatModel({
      members: { $all: [firstId, secondId] },
    })
  
    //if (chat) res.status(200).json(chat)
  
    const newChat = new chatModel({
      members: [firstId, secondId],
    })
  
    const response = newChat.save()
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
})

exports.getChats = catchErrors(async (req, res) => {
  const userId = req.query.userId

  const chats = await chatModel.find({
    members: {$in: [userId]},
  })

  res.status(200).json(chats)
})

exports.getChat = catchErrors(async (req, res) => {
  const { firstId, secondId } = req.query

  const chat = await chatModel.find({
    members: {$all: [firstId, secondId]},
  })

  res.status(200).json(chats)
})

exports.deleteChat = catchErrors(async (req, res) => {
  const { chatId } = req.query

  chatModel.find({ id: chatId }).remove().exec();

  res.status(200).json('Deleted success!')
})
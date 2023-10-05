const messageModel    = require('../Models/messageModel.js')
const { catchErrors } = require('../utils.js')

exports.createMessage = catchErrors(async (req, res) => {
  const { chatId, senderId, text } = req.body

  const message = new messageModel({
    chatId,
    senderId,
    text,
  })

  const response = await message.save()
  res.status(200).json(response)
})

exports.getMessages = catchErrors(async (req, res) => {
  const { chatId } = req.query

  const messages = await messageModel.find({ chatId })
  res.status(200).json(messages)
})

exports.getLastMessage = catchErrors(async (req, res) => {
  const { chatId } = req.query

  const messages = await messageModel.find({ chatId })
  res.status(200).json(messages[messages.length - 1])
})
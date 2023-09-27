const User = require('../models/user.js')
const { internalServerError } = require('../utils.js')

module.exports = function(app) {
  app.post('/upload', async (req, res) => {
    try {
      res.json({ status: 'Success is uploading'})
    } catch (err) { internalServerError(res) }
  })

  app.post('/GetProfile', async (req, res) => {
    try {
      const user = await UserModel.findById(req.body.userId)

      if (!user) {
        return res.status.apply(404).json({
          message: 'Пользователь не найден'
        })
      }

      const { passwordHash, ...userData } = user._doc

      res.json(userData)
    } catch (err) { internalServerError() }
  })

  app.post('/GetImage', async (req, res) => {
    try {
      const path = require('path');
      res.sendFile(path.resolve(`images/${req.body.userId}.jpeg`));
    } catch (err) { internalServerError() }
  })

  app.post('/SetProfile', async (req, res) => {
    try {
      if (req.body.options) {
        const { userId, name, age, description, gender }  = JSON.parse(req.body.options)

        await UserModel.updateOne({ _id: userId }, {
          $set: {
            name,
            age,
            description,
            gender,
          }
        })
      }

      res.json({ status: 'Success Edit'})
    } catch (err) { internalServerError() }
  })

  app.post('/GetUsers', async (req, res) => { 
    try {
      // const user = await UserModel.findById(req.body.userId)

      // const likes = user._doc.likes
      // const dilikes = user._doc.dilikes
    
      const users = await UserModel.find()
      //console.log(users)
      res.json(users)
    } catch (err) { internalServerError() }
  })

  app.post('/SetLike', async (req, res) => { 
    try {
      const { userId, humanId, like }  = req.body

      if (like) {
        await UserModel.updateOne({ _id: userId }, {
          $set: {likes: [...new Set([...likes, humanId])]}
        })
      } else {
        await UserModel.updateOne({ _id: userId }, {
          $set: {dilikes: [...new Set([...dilikes, humanId])]}
        })
      }
    

      res.json({ status: 'Success Edit'})
    } catch (err) { internalServerError() }
  })
}
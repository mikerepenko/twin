const User = require('../models/User.js')
const { internalServerError } = require('../utils.js')

module.exports = function(app) {
  app.get('/user:id?', async (req, res) => {
    try {
      const user = await User.findById(req.query.id)

      if (!user) {
        return res.status.apply(404).json({
          message: 'Пользователь не найден'
        })
      }

      const { passwordHash, ...userData } = user._doc

      res.json(userData)
    } catch (err) { internalServerError(res) }
  })

  app.post('/GetImage', async (req, res) => {
    try {
      const path = require('path');
      res.sendFile(path.resolve(`images/${req.body.userId}.jpeg`));
    } catch (err) { internalServerError(res) }
  })

  app.post('/SetProfile', async (req, res) => {
    try {
      if (req.body.options) {
        const { userId, name, age, description, gender }  = JSON.parse(req.body.options)

        await User.updateOne({ _id: userId }, {
          $set: {
            name,
            age,
            description,
            gender,
          }
        })
      }

      res.json({ status: 'Success Edit'})
    } catch (err) { internalServerError(res) }
  })

  app.post('/GetUsers', async (req, res) => { 
    try {
      // const user = await UserModel.findById(req.body.userId)

      // const likes = user._doc.likes
      // const dilikes = user._doc.dilikes
    
      const users = await User.find()
      //console.log(users)
      res.json(users)
    } catch (err) { internalServerError(res) }
  })

  app.post('/SetLike', async (req, res) => { 
    try {
      const { userId, humanId, like }  = req.body

      if (like) {
        await User.updateOne({ _id: userId }, {
          $set: {likes: [...new Set([...likes, humanId])]}
        })
      } else {
        await User.updateOne({ _id: userId }, {
          $set: {dilikes: [...new Set([...dilikes, humanId])]}
        })
      }
    

      res.json({ status: 'Success Edit'})
    } catch (err) { internalServerError(res) }
  })
}
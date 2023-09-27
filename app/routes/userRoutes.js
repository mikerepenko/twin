const User = require('../models/User.js')
const { catchErrors } = require('../utils.js')

module.exports = function(app) {
  app.get('/user:id?', catchErrors(async (req, res) => {
    const user = await User.findById(req.query.id)

    if (!user) {
      return res.status.apply(404).json({
        message: 'Пользователь не найден'
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  }))

  app.post('/GetImage', catchErrors(async (req, res) => {
    const path = require('path')
    res.sendFile(path.resolve(`images/${req.body.userId}.jpeg`))
  }))

  app.post('/SetProfile', catchErrors(async (req, res) => {
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
  }))

  app.post('/GetUsers', catchErrors(async (req, res) => { 
    const users = await User.find()
    res.json(users)
  }))

  app.post('/SetLike', catchErrors(async (req, res) => {
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
  }))
}
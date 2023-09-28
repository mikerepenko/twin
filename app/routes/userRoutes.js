const path = require('path')
const User = require('../models/User.js')
const { catchErrors } = require('../utils.js')

module.exports = function(app) {
  app.get('/users:id?', catchErrors(async (req, res) => {
    try {
      const users = await User.find()
      const user = users.filter((u) => u._id === req.query.id)
  
      const ratedUsers = [...user.likes, ...user.dislikes]
      
      res.send(users.filter((u) => !ratedUsers.includes(u._id)))
    } catch (err) {
      console.log(err)
    }
  }))

  app.get('/user:id?', catchErrors(async (req, res) => {
    const user = await User.findById(req.query.id)

    if (!user) {
      return res.status.apply(404).json({
        message: 'Пользователь не найден'
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.send(userData)
  }))

  app.post('/user', catchErrors(async (req, res) => {
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

    res.send({ status: 'Success Edit'})
  }))
}
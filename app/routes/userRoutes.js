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

  app.get('/image:id?', catchErrors(async (req, res) => {
    const path = require('path')
    res.sendFile(path.resolve(`images/${req.query.id}.jpeg`))
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

    res.json({ status: 'Success Edit'})
  }))

  app.get('/users', catchErrors(async (req, res) => {
    const users = await User.find()
    res.send({ users })
  }))
}
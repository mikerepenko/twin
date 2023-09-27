const User = require('../models/User.js')
const { catchErrors } = require('../utils.js')

module.exports = function (app) {
  app.post('/like', catchErrors(async (req, res) => {
    const { userId, twinId }  = req.body

    await User.updateOne({ _id: userId }, {
      $set: {likes: [...new Set([...likes, twinId])]}
    })

    res.json({ status: 'Success'})
  }))

  app.post('/dilike', catchErrors(async (req, res) => {
    const { userId, twinId }  = req.body

    await User.updateOne({ _id: userId }, {
      $set: {dilikes: [...new Set([...dilikes, twinId])]}
    })

    res.json({ status: 'Success'})
  }))

  
  app.get('/twins', catchErrors(async (req, res) => {
    const user = await User.findById(req.query.id)
    const twins = user._doc.twins

    res.send({ twins })
  }))
}
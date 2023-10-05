const userModel       = require('../Models/userModel.js')
const { catchErrors } = require('../utils.js')
const mongoose        = require('mongoose')

exports.like = catchErrors(async (req, res) => {
  try {
    const { userId, twinId }  = req.body

    await userModel.updateOne({ _id: userId }, {
      $set: {likes: twinId}
    })
  
    res.send({ status: 'Success'})
  } catch (err) {
    console.log(err)
  }
})

exports.dislike = catchErrors(async (req, res) => {
  const { userId, twinId }  = req.body

  await userModel.updateOne({ _id: userId }, {
    $set: {dislikes: twinId}
  })

  res.send({ status: 'Success'})
})

exports.getTwins = catchErrors(async (req, res) => {
  try {
    const user = await userModel.findById(req.query.id)
    const twinIds = user._doc.twins
  
    const twins = await userModel.find({
      '_id': { $in: twinIds.map((id) => new mongoose.Types.ObjectId(id))}
    })

    res.send(twins)
  } catch (err) {
    console.log(err)
  }
})
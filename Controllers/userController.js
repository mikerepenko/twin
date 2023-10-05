const userModel            = require('../Models/userModel.js')
const { catchErrors }      = require('../utils.js')

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    const user = await userModel.findById(req.query.id)

    const selectedUsers = [...user.likes, ...user.dislikes, user._id.toString()]

    const findGender = user.gender === 'Мужской' ? 'Женский' : 'Мужской'

    res.send(users
      .filter((u) => !selectedUsers.includes(u._id.toString()))
      .filter((u) => u.gender === findGender)
    )
  } catch (err) {
    console.log(err)
  }
}

exports.getUser = catchErrors(async (req, res) => {
  const user = await userModel.findById(req.query.id)

  if (!user) {
    return res.status.apply(404).json({
      message: 'Пользователь не найден'
    })
  }

  const { passwordHash, ...userData } = user._doc

  res.send(userData)
})

exports.editUser = catchErrors(async (req, res) => {
  if (req.body.options) {
    const { userId, name, age, description, gender }  = JSON.parse(req.body.options)

    await userModel.updateOne({ _id: userId }, {
      $set: {
        name,
        age,
        description,
        gender,
      }
    })
  }

  res.send({ status: 'Success Edit'})
})
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
const UserModel = require('../models/user.js')

exports.login = async (req, res) => {
  try {
    const options = JSON.parse(Object.keys(req.body)[0])

    const user = await UserModel.findOne({ email: options.email })

    if (!user) {
      res.status(400).json({
        message: "Не верный email или пароль"
      })
    }

    const isValidPass = await bcrypt.compare(options.password, user._doc.passwordHash)

    if (!isValidPass) {
      res.status(400).json({
        message: "Не верный email или пароль"
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ token, userId: user._id })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось авторизоваться',
    })
  }
}

exports.register = async (req, res) => {
  try {
    // const errors = validationResult(req)
    // if (!errors,isEmpty()) {
    //   return res.status(400).json(errors.array())
    // }

    const options = JSON.parse(Object.keys(req.body)[0])

    const password = options.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = UserModel({
      email: options.email,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ token, userId: user._id })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось зарегистрировать',
    })
  }
}

exports.profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status.apply(404).json({
        message: 'Пользователь не найден'
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Нет доступа',
    })
  }
}

exports.upload = async (req, res) => {
  try {
    res.json({ status: 'Success is uploading'})
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server is not responding',
    })
  }
}

exports.download = async (req, res) => {
  try {
    const path = require('path');
    res.sendFile(path.resolve('images/test.jpeg'));
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server is not responding',
    })
  }
}

exports.edit = async (req, res) => {
  const { userId, name, age, description } = req.body

  try {
    await UserModel.updateOne({ _id: userId }, {
      $set: {
        name,
        age,
        description,
      }
    })

    res.json({ status: 'Success'})
  } catch (err) {
    res.status(400).json({
      message: 'Error',
    })
  }
}

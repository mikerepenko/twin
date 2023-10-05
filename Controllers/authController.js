const bcrypt                        = require('bcrypt')
const jwt                           = require('jsonwebtoken')
const userModel                     = require('../Models/userModel.js')
const { catchErrors, generateCode, sendMail } = require('../utils.js')

exports.login = catchErrors(async (req, res) => {
  const options = JSON.parse(Object.keys(req.body)[0])
  const user = await userModel.findOne({ email: options.email })

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

  res.send({ token, userId: user._id })
})

exports.register = catchErrors(async (req, res) => {
  try {
  const { email, password, code } = req.body

  if (!code) {
    const newCode = generateCode()
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const doc = userModel({
      email: email,
      passwordHash: hash,
      code: newCode,
    })
    await doc.save()
  
    sendMail(newCode, email)
    return res.json('Success')
  }

  const user = await User.findOne({ email })

  if (user._doc.code === code) {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '30d' })
    return res.json({ token, userId: user._id })
  } else {
    res.status(400).json({
      message: 'Код неверный!',
    })
  }
} catch (err) {
  console.log(err)
}
})
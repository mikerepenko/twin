const User = require('../models/User.js')
const { internalServerError, generateCode } = require('../utils.js')

module.exports = function(app) {
  app.post('/login', async (req, res) => {
    try {
      const options = JSON.parse(Object.keys(req.body)[0])
      const user = await User.findOne({ email: options.email })

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
    } catch (err) { internalServerError(res) }
  })

  app.post('/register', async (req, res) => {
    try {
      const response = JSON.parse(Object.keys(req.body)[0])
      const user = await User.findOne({ email: response.email })
  
      if (!user) {
        res.status(400).json({
          message: 'Пользователь не найден',
        })
      }
  
      if (user._doc.code === response.code) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '30d' })
  
        return res.json({ token, userId: user._id })
      } else {
        res.status(400).json({
          message: 'Попробуйте еще раз',
        })
      }
    } catch (err)  { internalServerError(res) }
  })

  app.post('/code', async (req, res) => {
    try {
      const response = JSON.parse(Object.keys(req.body)[0])
  
      const code = generateCode()
    
      const password = response.password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
    
      const doc = UserModel({
        email: response.email,
        passwordHash: hash,
        code: code,
      })
      await doc.save()
    
      //Send to email
      return res.json(`Код: ${code}`)
    } catch (err) { internalServerError(res) }
  })
}
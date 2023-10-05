const jwt             = require('jsonwebtoken')
const path            = require('path')
const multer          = require('multer')



exports.catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      res.status(500).json({
        error: "Internal Server Error",
        message: err,
      })
    })
  }
}

exports.generateCode = () => {
  return 50000 + Math.floor(Math.random() * 9999)
}

exports.auth =  (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      req.userId = decoded._id
      next()
    } catch (err) {
      return res.status(403).json({
        'message': 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      'message': 'Нет доступа',
    })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

exports.saveFile = multer({ storage }).single('file')

exports.sendMail = (code, email) => {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
      user: 'mike.repenko@yandex.ru',
      pass: 'MonsteR1998'
    }
  });

  const mailOptions= {
    from: 'mike.repenko@yandex.ru',
    //to: email,
    to: 'mike.repenko@ya.ru',
    subject: 'Код подтверждения от TWIN (сервис для знакомств)',
    text: `${code}`,
    html: `<div>${code}</div>`,
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

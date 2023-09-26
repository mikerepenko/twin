const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
require('dotenv').config()

const UserController = require('./controllers/userController.js')
const { auth } = require('./middlewares/auth.js')
const { chat } = require('./utils/chat.js')

mongoose
  .connect(`mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin&directConnection=true`)
  .then(() => console.log('DB - success'))
  .catch((err) => console.log('DB - error', err))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })
const type = upload.single('file')

app.post('/login', UserController.login)
app.post('/register', UserController.register)
app.post('/upload', type, UserController.upload)
app.post('/GetProfile', UserController.getProfile)
app.post('/GetImage', type, UserController.getImage)
app.post('/SetProfile', type, UserController.setProfile)

app.post('/code', UserController.code)
app.post('/SetLike', UserController.setLike)

const server = app.listen(5000, (err) => {
  if (err) throw err
  console.log('Server - success')
})

chat(server)
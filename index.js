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
    cb(null, file.name)
  }
})

const upload = multer({ storage })
const type = upload.single('file')

app.post('/login', UserController.login)
app.post('/register', UserController.register)
app.get('/profile', auth, UserController.profile)
app.post('/upload', type, UserController.upload)
app.post('/download', type, UserController.download)
app.post('/edit', type, UserController.edit)
app.post('/code', UserController.code)

const server = app.listen(5000, (err) => {
  if (err) throw err
  console.log('Server - success')
})

chat(server)
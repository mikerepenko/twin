const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')

const UserController = require('./controllers/userController.js')
const { checkAuth } = require('./utils/checkAuth.js')

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.kxfnkxj.mongodb.net/?retryWrites=true&w=majority')
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
app.get('/profile', checkAuth, UserController.profile)
app.post('/upload', type, UserController.upload)
app.post('/download', type, UserController.download)

app.listen(5000, (err) => {
  if (err) throw err
  console.log('Server - success')
})
const express         = require('express')
const mongoose        = require('mongoose')
const bodyParser      = require('body-parser')
const app             = express()
const config          = require('./config')
                        require('dotenv').config()
                        require('./app/routes')(app)

mongoose
  .connect(config.db)
  .then(() => console.log('DB - success'))
  .catch((err) => console.log('DB - error', err))

app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
  console.log('Server - success')
})
const express         = require('express')
const mongoose        = require('mongoose')
const app             = express()
const config          = require('./config')
                        require('dotenv').config()

mongoose
  .connect(config.db)
  .then(() => console.log('DB - success'))
  .catch((err) => console.log('DB - error', err))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

require('./Routes')(app)
require('./socket.js')

app.listen(process.env.PORT, () => {
  console.log('Server - success')
})
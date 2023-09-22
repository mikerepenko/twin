const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const model = mongoose.model('User', UserSchema)

module.exports = model
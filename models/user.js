const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    description: String,
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    code: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', UserSchema)
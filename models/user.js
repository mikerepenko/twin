const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: String,
    passwordHash: String,
    code: String,
    name: String,
    age: String,
    description: String,
    gender: String,
    city: String,
    likes: [String],
    dislike: [String],
    twins: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', UserSchema)
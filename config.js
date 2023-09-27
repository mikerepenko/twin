require('dotenv').config()

module.exports = {
  db: `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin&directConnection=true`
}
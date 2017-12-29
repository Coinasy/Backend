var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({ // What each user will look like
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  facebook_id: String,
  google_id: String,
  profile_picture: String
})

module.exports = mongoose.model('User', userSchema)

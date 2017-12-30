var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var userSchema = new mongoose.Schema({ // What each user will look like
  firstname: {
    type: String,
    required: [true, 'first name is require'],
    minlength: [2, 'first name min length is 2'],
    maxlength: [40, 'first name max length is 40']
  },
  lastname: {
    type: String,
    required: [true, 'last name is require'],
    minlength: [2, 'last name min length is 2'],
    maxlength: [40, 'last name max length is 40']
  },
  email: {
    type: String,
    required: [true, 'email name is require'],
    unique: [true, 'email already taken'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'invalid email']
  },
  username: {
    type: String,
    unique: [true, 'username already taken'],
    required: [true, 'last name is require'],
    minlength: [6, 'username min length is 6'],
    maxlength: [40, 'username max length is 40']
  },
  password: {
    type: String,
    require: [true, 'password is require']
  },
  facebook_id: String,
  google_id: String,
  profile_picture: String
}, {timestamps: true})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)

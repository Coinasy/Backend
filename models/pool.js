var mongoose = require('mongoose')

var poolSchema = new mongoose.Schema({ // What each user will look like
  name: {
    type: String,
    required: [true, 'pool name is require'],
    minlength: [2, 'pool name min length is 2'],
    maxlength: [40, 'pool name max length is 40']
  },
  size: {
    // the amount of people can participate. 0 is unlimited
    type: Number,
    required: [true, 'size is require'],
    min: [0, 'the size cannot be negative']
  },
  entries: {
    // the money for player in the pool to start with.
    type: Number,
    min: [1, 'min entries is 1']
  },
  fee: {
    // the entry fee before entering the game
    type: Number,
    min: [0, 'fee cannot be negative'],
    required: true
  },
  password: {
    // private pool require password. 
    type: String,
  }, 
  startDate: {
    type: Date,
    required: [true, 'the date when the pool start is require']
  },
  endDate: {
    type: Date,
    required: [true, 'the date when the pool start is require']
  },
  participant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true})

module.exports = mongoose.model('Pool', poolSchema)

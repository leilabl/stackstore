var mongoose = require('mongoose');


var ReviewSchema = new Schema({
  stars: {
    type: Number,
    min: 1,
    max: 5
  },
  description: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Review', schema);
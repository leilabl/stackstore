var mongoose = require('mongoose');


var ReviewSchema = new Schema({
  stars: {
    type: Number
  },
  description: {
    type: String
  },
  wine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wine'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

mongoose.model('Review', schema);
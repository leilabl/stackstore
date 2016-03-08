var mongoose = require('mongoose');


var ReviewSchema = new mongoose.Schema({
  title: {
    type: String
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  content: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wine',
    require: true
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

mongoose.model('Review', ReviewSchema);
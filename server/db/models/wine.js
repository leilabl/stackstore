var mongoose = require('mongoose');


var WineSchema = new Schema({
  type: { 
    type: String,
    enum: ['red', 'white'],
    required: true
  },
  name: { 
  	type: String
  },
  variety: { 
  	type: String, 
  	required: true
  },
  region: {
    type: String,
    required: true
  },
  winery: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  tags: {
    type: [String]
  },
  quantity: {
  	type: Number,
  	required: true
  },
  image: {
  	type: String,
  	required: true
  }
});


WineSchema.pre('validate', function(next) {
	var randomNumber = Math.ceil(Math.random()*5)
	this.image = '/img/' + this.type + randomNumber + '.png'
})


mongoose.model('Wine', schema);
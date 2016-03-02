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
  inventory: {
  	type: Number,
  	required: true
  },
  //unit mL; maybe take care on front-end
  size: {
    type: Number,
    default: 750
  }
  image: {
  	type: String,
  	required: true
  }
});

//files currently do not exist - need to create
WineSchema.pre('validate', function(next) {
	var randomNumber = Math.ceil(Math.random()*5)
	this.image = '/img/' + this.type + randomNumber + '.png'
})


mongoose.model('Wine', schema);
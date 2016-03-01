var mongoose = require('mongoose');


var WineSchema = new mongoose.Schema({
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
    default: 10
  },
  //unit mL; maybe take care on front-end
  size: {
    type: Number,
    default: 750
  },
  image: {
  	type: String,
  	required: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }]
});

//files currently do not exist - need to create
WineSchema.pre('validate', function (next) {
	var randomNumber = Math.ceil(Math.random()*5);
	this.image = '/img/' + this.type + randomNumber + '.png';
  next();
});

WineSchema.virtual('rating').get(function(){
  var total = this.reviews.reduce(function(sum, elem) {
    return sum + elem.stars;
  }, 0);
  return total/this.reviews.length;
});

WineSchema.virtual('displayName').get(function(){
  var displayName;
  if (this.name) {
    displayName = this.year + " " + this.winery + " " + this.name + " - " + this.variety;
  }
  else displayName = this.year + " " + this.winery + " - " + this.variety;
  return displayName;
});

mongoose.model('Wine', WineSchema);
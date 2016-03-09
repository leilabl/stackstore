var mongoose = require('mongoose');
require('./review');
var Review = mongoose.model('Review');


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
  description: {
    type: String
    // required: true
  }, 
  //AW: should have rating field: 
  // rating: { type: Number }
});

//files currently do not exist - need to create
WineSchema.pre('validate', function (next) {
	var randomNumber = Math.ceil(Math.random()*5);
	this.image = '/img/' + this.type + randomNumber + '.png';
  next();
});

WineSchema.statics.findReviews = function (id) {
  return Review.find({
    wine: id
  });
};

// AW: should attach rating to wine and save the wine
WineSchema.methods.findRating = function() {
  //virtuals cannot be async
  return Review.find({wine: this._id})
  .then(function(reviews) {
    var total = reviews.reduce(function(sum, elem) {
      return sum + elem.stars;
    }, 0);
    return total/reviews.length;
  })

};

// AW: should attach rating to wine and save the wine
// and maybe call this method `calculateRating`
WineSchema.methods.findRating = function() {
  //virtuals cannot be async
  return Promise.resolve(Review.find({wine: this._id})).bind(this)
  .then(function(reviews) {
    var total = reviews.reduce(function(sum, elem) {
      return sum + elem.stars;
    }, 0);
    var rating = total/reviews.length;
    // AW: `this` is the wine document because of `bind`
    //this.rating = rating; 
    //return this.save()
  })
};


mongoose.model('Wine', WineSchema);
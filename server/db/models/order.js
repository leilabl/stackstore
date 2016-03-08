'use strict';

var mongoose = require('mongoose');

var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

var shippingRates = {
  "standard": 4.95,
  "express": 12.95,
  "overnight": 25.95
}

var LineItemSchema = new mongoose.Schema({
      wine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wine',
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        min: 1,
        required: true
      }
})

var ShippingAddressSchema = new mongoose.Schema({
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      enum: states,
      required: true
    },
    zip: {
      type: String,
      required: true,
      validate: {
        validator: function(value){
          return /\d{5}/.test(value);
        },
        message: '{VALUE} is not a valid zip code'
      }
    }
});

module.exports = ShippingAddressSchema;

var OrderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [LineItemSchema],

  shippingAddress: ShippingAddressSchema,

  shippingRate: {
    type: String,
    enum: Object.keys(shippingRates),
    default: "standard"
  },

  date: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["pending", "shipped", "cancelled", "returned"],
    default: "pending"
  }
})

OrderSchema.virtual('tax').get(function() {
  return 0.06;
})

OrderSchema.virtual('total').get(function() {
  if (this.items.length > 0) {
    var subTotal = this.items.reduce(function(sum, curr){
      return sum + (curr.price * curr.quantity);
    }, 0)
    return subTotal + shippingRates[this.shippingRate] + (subTotal * this.tax);
  }
  return 0;
})

OrderSchema.statics.findByUserId = function (userId) {
  return mongoose.model('Order').find({owner: userId})
}

OrderSchema.methods.findSimilar = function () {
  // grab all orders that share an item with this one
  // gather hash of all items in those orders (other than this item)
  // sort by # occurences
  // return list of most popular (could be 5, 10, etc., depending on UI)

  // this may make more sense in the WineSchema?
}

OrderSchema.methods.cancel = function () {
  this.status = "cancelled"; 
  return this.save();
}

mongoose.model('Order', OrderSchema);
'use strict';

var mongoose = require('mongoose');

// NOTES FOR 3/1:

// MAYBE worth having CART and ORDER be two separate models - when you "check out" the cart gets saved as a new ORDER object for that user. At this time, Price is set in the DB

// Each user would have 1 cart at a time, and it will only exist until they either "check out" (it turns into an order on the DB) or until they delete their cart/cookies. AKA this would happen on the front-end, JSData?

// cart.submitOrder({
//   owner: this.user,
//   items: [
//     {
//       wine: this.wine,
//       price: this.price,
//       quantity: this.quantity
//     }
//   ]
// })

var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

var OrderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
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
        required: true
      }
    }
  ],

  shippingAddress: {
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
      type: Number,
      required: true
    }
  },

  shippingRate: {
    type: Number,
    enum: [4.95, 12.95],
    default: 4.95
  }
})

OrderSchema.virtual('tax').get(function() {
  return 0.06;
})

OrderSchema.virtual('total').get(function() {
  var subTotal = this.items.reduce(function(sum, next){
    return sum + (next.price * next.quantity)
  }, 0)
  return subTotal + (subTotal * this.tax) + this.shippingRate;
})


mongoose.model('Order', OrderSchema);
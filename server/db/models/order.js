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
  ]
})

OrderSchema.virtual('total').get(function() {
  return this.items.reduce(function(sum, next){
    return sum + (next.price * next.quantity)
  }, 0)
})


mongoose.model('Order', OrderSchema);
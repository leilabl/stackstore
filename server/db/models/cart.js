'use strict';

var mongoose = require('mongoose');
var order_schemas = require('./order');
var Order = mongoose.model('Order');

var CartItem = new mongoose.Schema({
      wine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wine',
        required: true
      },
      quantity: {
        type: Number,
        min: 1,
        default: 1
      }
})

var CartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [CartItem]

})

CartSchema.methods.addToCart = function (wineId) {
  this.items.push({wine: wineId});
  return this.save();
}

CartSchema.methods.removeFromCart = function(wineId) {
  this.items = this.items.filter(function(item) {
    return item.wine !== wineId;
  });
  return this.save();
}

CartSchema.methods.submitCart = function () {
  var items = this.items.map(function(item) {
    item.price = item.wine.price;
  })
  var self = this;
  var newOrder;
  return Order.create({
      owner: this.owner,
      items: items
    })
    .then(function(order){
      newOrder = order;
      return self.remove({});
    })
    .then(function(){
      return newOrder;
    })
}

mongoose.model('Cart', CartSchema);
mongoose.model('CartItem', CartItem);
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../../db/models/cart');
var Cart = mongoose.model('Cart');
var CartItem = mongoose.model('CartItem');


// as of right now, these only retrieve the current user's cart

// retrieve cart from DB
router.get('/', function(req, res, next) {
  Cart.findById(req.user._id)
  .then(function(cart) {
    if (cart) return cart;
    else {
      return Cart.create({
        owner: req.user._id,
        items: []
      });
    }
  })
  .then(function(cart){
    res.json(cart);
  })
});

// create new cart? (only if we decide to allow saving carts)
router.post('/', function(req, res, next) {
  Cart.create(req.body)
  .then(function(cart){
    res.json(cart);
  })
});

// update your cart
router.put('/', function(req, res, next) {
  Cart.findOne({owner: req.user._id})
  .then(function(cart) {
    if (!cart) {
      return Cart.create({owner:req.user._id})
      .then(function(cart) {
        return CartItem.create({wine:req.body._id})
        .then(function(newItem) {
          cart.items.push(newItem)
          return cart.save()
        })
      })
    }
    else {
      var exgItem = false;
      for (var i=0; i< cart.items.length; i++) {
        if (cart.items[i].wine == req.body._id) {
          exgItem = true;
          cart.items[i].quantity++;
          return cart.save()
        }
      }
      if (!exgItem) {
        return CartItem.create({wine:req.body._id})
          .then(function(newItem) {
            cart.items.push(newItem)
            return cart.save()
          })
        } 
    }
  })
  .then(function(cart) {
    res.status(201).json(cart);
  })
})

// remove all items from cart
router.delete('/', function(req, res, next) {
  Cart.remove({owner: req.user._id})
  .then(function(){
    res.status(204).end();
  })
})

module.exports = router;
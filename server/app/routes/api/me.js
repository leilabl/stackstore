var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../../db/models/user');
var User = mongoose.model('User');

// AW: hmmmmmmmmm re: this router.use
router.use(function(req, res, next){
  // AW: why re-retrieve the req.user?
  // you already have this user document
  User.findById(req.user._id)
  .then(function(user) {
    // AW: so basically req.reqUser points to the SAME document
    // that req.user points to...
    req.reqUser = user.sanitize();
    next();
  })
})

/*
AW: since req.user and req.reqUser point to the SAME document, 
this file doesn't seem to add anything... 

*/

router.get('/', function(req, res, next) {
  res.json(req.reqUser);
})

router.get('/orders', function(req, res, next) {
  //AW: Why find what you already have?
  User.findById(req.reqUser._id)
  .then(function(user){
    return user.findOrders()
    .populate({ 
         path: 'items',
         populate: {
           path: 'wine',
         } 
    })
  })
  .then(function(orders){
    res.json(orders);
  })
  .then(null, next);
})

router.get('/reviews', function(req, res, next){
  User.findById(req.reqUser._id)
  .then(function(user){
    return user.findReviews()
  })
  .then(function(reviews){
    res.json(reviews);
  })
  .then(null, next);
})

router.post('/shipping', function(req, res, next){
  req.reqUser.addShippingMethod(req.body)
  .then(function(user){
    res.status(201).json(user);
  })
  .then(null, next);
});

router.put('/shipping', function(req, res, next){
  req.reqUser.updateShippingMethod(req.body)
  .then(function(user) {
    res.status(201).json(user);
  })
  .then(null, next);
})

router.delete('/shipping', function(req, res, next){
  req.reqUser.removeShippingMethod(req.body)
  .then(function(user){
    res.status(204).json(user);
  });
});

router.post('/payment', function(req, res, next) {
  req.reqUser.addPaymentMethod(req.body)
  .then(function(user) {
    res.status(201).json(user);
  })
  .then(null, next);
});

router.put('/payment', function(req, res, next){
  req.reqUser.updatePaymentMethod(req.body)
  .then(function(user) {
    res.status(201).json(user);
  })
  .then(null, next);
});

router.delete('/payment', function(req, res, next) {
  req.reqUser.removePaymentMethod(req.body)
  .then(function(user) {
    res.status(204).json(user);
  })
  .then(null, next);
})

module.exports = router;
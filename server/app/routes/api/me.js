var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../../db/models/user');
var User = mongoose.model('User');

router.use(function(req, res, next){
  User.findById(req.user._id)
  .then(function(user) {
    req.reqUser = user.sanitize();
    next();
  })
})

router.get('/', function(req, res, next) {
  res.json(req.reqUser);
})

router.get('/orders', function(req, res, next) {
  req.reqUser.findOrders()
  .then(function(orders) {
    res.json(orders)
  })
  .then(null, next);
})

router.get('/reviews', function(req, res, next){
  req.reqUser.findReviews()
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
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// only available to admin
router.get('/', function (req, res) {
  mongoose.model('User')
  .find({})
  .then(function(users) {
    res.json(users)
  })
  .then(null, function(err) {
    console.log(err);
    res.sendStatus(404);
  })
})

// only available to admin and user themself?
router.get('/:id', function (req, res) {
  var id = req.params.id;
  mongoose.model('User')
  .findById(id)
  .then(function(user) {
    // is it a promise??
    return user.sanitize();
  })
  .then(function(sanitizedUser) {
    res.json(sanitizerUser)
  })
  .then(null, function(err) {
    console.log(err);
    res.sendStatus(404);
  })
})

router.get('/:id/orders', function (req, res) {
  var id = req.params.id;
  mongoose.model('User')
  .findById(id)
  .then(function(user) {
    return user.findOrders()
  })
  .then(function(orders) {
    res.json(orders)
  })
  .then(null, function(err) {
    console.log(err);
    res.sendStatus(404);
  })
})

router.get('/:id/reviews', function (req, res) {
  var id = req.params.id;
  mongoose.model('User')
  .findById(id)
  .then(function(user) {
    return user.findReviews()
  })
  .then(function(reviews) {
    res.json(reviews)
  })
  .then(null, function(err) {
    console.log(err);
    res.sendStatus(404);
  })
})



module.exports = router;
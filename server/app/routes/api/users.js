var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../../db/models/user');
var User = mongoose.model('User');

router.use('/:userId/reviews', require('./reviews'));

router.param('userId', function (req, res, next, userId){
  User.findById(userId)
  .then(function(user){
    req.reqUser = user;
    next();
  })
  .then(null, next);
})

// only available to admin
router.get('/', function (req, res, next) {
  User.find({})
  .then(function(users) {
    res.json(users)
  })
  .then(null, next);
})

// only available to admin and user themself?
router.get('/:userId', function (req, res) {
  res.json(req.reqUser.sanitize())
})

// admin and user
// is this already taken care of in orders route??
router.get('/:userId/orders', function (req, res, next) {
  req.reqUser.findOrders()
  .then(function(orders) {
    res.json(orders)
  })
  .then(null, next)
})

// post a new user
router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function(newUser){
    res.status(201).json(newUser)
  })
  .then(null, next);
})

// update a user
router.put('/:userId', function (req, res, next) {
  req.reqUser.set(req.body)
  req.reqUser.save()
  .then(function(updatedUser){
    res.json(updatedUser);
  })
  .then(null, next);
})

// delete a user
router.delete('/:userId', function (req, res, next) {
  req.reqUser.remove()
  .then(function(){
    res.sendStatus(204)
  })
  .then(null, next);
})



module.exports = router;
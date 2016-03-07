var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../../db/models/user');
var User = mongoose.model('User');

router.use('/me', require('./me'));

router.use('/:username/reviews', require('./reviews'));

// username URL parameter
router.param('username', function (req, res, next, username){
  User.findOne({username: username})
  .then(function(user){
    req.reqUser = user;
    next();
  })
  .then(null, next);
})

// get list of all users
router.get('/', function (req, res, next) {
  if (req.user.isAdmin) {
    User.find({})
    .then(function(users) {
      users = users.map(function(user) {
        return user.sanitize();
      });
      res.json(users)
    })
    .then(null, next);
  } else {
    res.sendStatus(403);
  }
})

// get user data
router.get('/:username', function (req, res) {
  res.json(req.reqUser.sanitize())
})

// get user's orders
router.get('/:username/orders', function (req, res, next) {
  if (req.reqUser._id === req.user.id || req.user.isAdmin) {
    req.reqUser.findOrders()
    .then(function(orders) {
      res.json(orders)
    })
    .then(null, next)
  } else {
    var err = new Error();
    err.status = 403;
    next(err);
  }
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
router.put('/:username', function (req, res, next) {
  if (req.reqUser._id === req.user._id || req.user.isAdmin) {
    req.reqUser.set(req.body)
    req.reqUser.save()
    .then(function(updatedUser){
      res.json(updatedUser);
    })
    .then(null, next);
  } else {
    var err = new Error();
    err.status = 403;
    next(err);
  }
})

// delete a user
router.delete('/:username', function (req, res, next) {
  if (req.reqUser._id === req.user._id || req.user.isAdmin) {
    req.reqUser.remove()
    .then(function(){
      res.sendStatus(204)
    })
    .then(null, next);
  } else {
    var err = new Error();
    err.status = 403;
    next(err);
  }
})



module.exports = router;
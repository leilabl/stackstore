var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.use('/:id/reviews', require('./reviews'));
//TW Add router.param() --see reviews for example
//TW Where are your nexts coming from?

// only available to admin
router.get('/', function (req, res) {
  mongoose.model('User')
  .find({})
  .then(function(users) {
    res.json(users)
  })
  .then(null, next);
})

// only available to admin and user themself?
router.get('/:id', function (req, res) {
  var id = req.params.id;
  mongoose.model('User')
  .findById(id)
  .then(function(user) {
    // is it a promise?? //TW nope
    return user.sanitize()
  })
  .then(function(sanitizedUser) {
    res.json(sanitizerUser)
  })
  .then(null, next);
})

// TW if you wanted to promisify user.sanitize 
// Promise.resolve(user.sanitize())
// .then(function(user){

// })

// admin and user
// is this already taken care of in orders route??
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
  .then(null, next);
})

// post a new user
router.post('/', function (req, res) {
  mongoose.model('User')
  .create(req.body)
  .then(function(newUser){
    res.json(newUser)
  })
  .then(null, next);
})

// update a user
router.put('/:id', function (req, res) {
  var id = req.params.id
  //TW refactor with set
  mongoose.model('User') 
  .findByIdAndUpdate(id, {$set: req.body}, {new: true, runValidators: true})
  .then(function(updatedUser){
    res.json(updatedUser)
  })
  .then(null, next);
})

// delete a user
router.delete('/:id', function(req, res) {
    var id = req.params.id
    mongoose.model('User')
    .findByIdAndRemove({_id: id})
    .then(function() {
      res.sendStatus(204)
      //TW equivalent of res.status(204).end()

    })
  .then(null, next);
})



module.exports = router;
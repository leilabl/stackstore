var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// available to eveyone
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
var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');

require('../../../db/models/review');
var Review = mongoose.model('Review');


// available to eveyone
router.get('/', function (req, res, next) {
  var id = req.params.id;
  Review.find({author: id})
  .then(function(reviews) {
    res.json(reviews)
  })
  .then(null, function(err) {
    console.log(err);
    res.sendStatus(404);
  })
})

router.post('/', function(req, res, next) {
  var review = req.body;
})

module.exports = router;
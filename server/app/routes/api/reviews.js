var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');

require('../../../db/models/review');
var Review = mongoose.model('Review'); //TW is this working for you currently?


// available to eveyone
router.get('/', function (req, res, next) {
  var id = req.params.id; //TW Where are these params coming from?
  Review.find({author: id})
  .then(function(reviews) {
    res.json(reviews)
  })
  .then(null, next)
})

router.post('/', function(req, res, next) {
  Review.create(req.body)
  .then(function(review){
    if (review.author === req.params.id) { //TW params?
      res.json(review);
    } else {
      var err = new Error();
      err.status(403);
      next(err);
    }  
  })
  .then(null, next);
});

router.get('/:reviewId', function(req, res, next){
  Review.findById(req.params.reviewId)
  .then(function(review){
    res.json(review);
  })
  .then(null, next);
})

router.put('/:reviewId', function(req, res, next) {
  Review.findById(req.params.reviewId)
  .then(function(review){
    if (review.author === req.params.id) { //TW what is req.params.id?
      return review.update(req.body)
    } else {
      var err = new Error();
      err.status(403);
      next(err);
    }
  })
  .then(null, next)
})

router.delete('/:reviewId', function(req, res, next) {
  Review.findById(req.params.reviewId)
  .then(function(review){
    if (review.author === req.params.id) { //TW what is req.params.id?
      return review.remove({});
    } else {
      var err = new Error();
      err.status(403);
      next(err);
    }
  })
  .then(null, next)
})

module.exports = router;
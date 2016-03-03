var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');

require('../../../db/models/review');
var Review = mongoose.model('Review');

router.param('reviewId', function(req, res, next, reviewId){
  Review.findById(reviewId)
  .then(function(review){
    req.review = review;
    next();
  })
  .then(null, next);
})

//nesting of routes still needed here in order to get reviews by user from other users
router.get('/', function (req, res, next) {
  var author = req.params.id; 
  Review.find({author: author})
  .then(function(reviews) {
    res.json(reviews)
  })
  .then(null, next)
})

router.post('/', function(req, res, next) {
  var review = req.body;
  review.author = req.user._id;
  Review.create(review)
  .then(function(review){
    res.status(201).json(review);
  })
  .then(null, next);
});

router.get('/:reviewId', function(req, res, next){
  res.json(req.review);
})

router.put('/:reviewId', function(req, res, next) {
  if (req.review.author === req.user._id) {
    req.review.set(req.body)
    req.review.save()
    .then(function(newReview){
      res.json(newReview);
    })
    .then(null, next)
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:reviewId', function(req, res, next) {
  if (req.review.author === req.user._id) {
    req.review.remove({})
    .then(function() {
      res.sendStatus(204)
    })
    .then(null, next);
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;
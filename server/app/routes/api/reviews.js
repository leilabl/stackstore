var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');
//TW rethink nesting of routes?
require('../../../db/models/review');
var Review = mongoose.model('Review');

//TW incorporate router.param
router.param('reviewId', function (req, res, next, reviewId){
  Review.findById(reviewId)
  .then(function(review){
    req.review = review;
    next();
  })
  .then(null, next);
})

// available to eveyone
router.get('/', function (req, res, next) {
  var id = req.params.id; //TW make more specific userId
  Review.find({author: id})
  .then(function(reviews) {
    res.json(reviews)
  })
  .then(null, next)
})

router.post('/', function(req, res, next) {
  //TW Associate review.author to req.user
  Review.create(req.body)
  .then(function(review){
    if (review.author === req.params.id) { 
      res.json(review); //TW status code?
    } else { //TW not necessary
      var err = new Error();
      err.status(403);
      next(err);
    }  
  })
  .then(null, next);
});

router.get('/:reviewId', function(req, res, next){
  // Review.findById(req.params.reviewId)
  // .then(function(review){
  //   res.json(review);
  // })
  // .then(null, next);
  res.json(req.review);
})

router.put('/:reviewId', function(req, res, next) {
  // Review.findById(req.params.reviewId)
  // .then(function(review){
  //   if (review.author === req.params.id) { //TW what is req.params.id?
  //     return review.update(req.body)
  //   } else {
  //     var err = new Error();
  //     err.status(403);
  //     next(err);
  //   }
  // })
  // .then(null, next)
  req.review.set(req.body)
  req.review.save()
  .then(function(newReview){
    res.json(newReview);
  })
})

router.delete('/:reviewId', function(req, res, next) {
  Review.findById(req.params.reviewId)
  .then(function(review){
    if (review.author === req.params.id) { //TW rethink this
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
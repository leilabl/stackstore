var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
require('../../../db/models/wine');
var Wine = mongoose.model('Wine')


router.param('wineId', function (req, res, next, wineId){
  	Wine.findById(wineId)
  	.then(function(wine){
      console.log(wine)
    	req.wine = wine;
    	next();
  	})
  	.then(null, next);
})

// router.param('selectedType', function(req, res, next, selectedType) {
//   Wine.find({type: selectedType})
//   .then(function(selectedTypes) {
//     req.selectedTypes = selectedTypes;
//     next()
//   })
//   .then(null, next)
// })

router.get('/', function (req, res, next) {
	Wine.find(req.query)
	.then(function(wines) {
   /* //AW: 

    return Promise.map(wines, function(w){
      return w.findRating()
    })
	})
  */
  .then(function(){
    res.json(wines)
  })
	.then(null, next)
})

router.get('/:wineId', function (req, res) {
	res.json(req.wine);
})

// router.get('/filter/:selectedType', function(req, res) {
//   res.json(req.selectedTypes)
// })

router.get('/:wineId/reviews', function (req, res, next) {
	Wine.findReviews(req.params.wineId)
  .populate('author')
	.then(function(reviews) {
		res.json(reviews)
	})
	.then(null, next)
})

router.get('/:wineId/rating', function (req, res, next) {
	req.wine.findRating()
	.then(function(rating) {
		res.json(rating)
	})
	.then(null, next)
})

router.post('/', function (req, res, next) {
  if (req.user.isAdmin) {
  	Wine.create(req.body)
  	.then(function(newWine) {
  		res.status(201).json(newWine)
  	})
  	.then(null, next)
  } else {
    res.sendStatus(403);
  }
})

router.put('/:wineId', function (req, res, next) {
  if (req.user.isAdmin) {
  	req.wine.set(req.body)
    	req.wine.save()
    	.then(function(updatedWine){
      res.json(updatedWine);
    	})
    	.then(null, next);
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:wineId', function (req, res, next) {
  if (req.user.isAdmin) {
  	req.wine.remove()
    	.then(function(){
      	res.sendStatus(204)
    	})
    	.then(null, next);
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;
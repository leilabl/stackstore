var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
require('../../../db/models/wine');
var Wine = mongoose.model('Wine')


router.param('wineId', function (req, res, next, wineId){
  	Wine.findById(wineId)
  	.then(function(wine){
    	req.wine = wine;
    	next();
  	})
  	.then(null, next);
})

router.get('/', function (req, res, next) {
	Wine.find({})
	.then(function(wines) {
		res.json(wines)
	})
	.then(null, next)
})

router.get('/:wineId', function (req, res) {
	res.json(req.wine);
})

router.get('/:wineId/reviews', function (req, res, next) {
	Wine.findReviews(req.params.wineId)
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

//on accesssible to admins
//perhaps need to consider preventing duplicate posts
router.post('/', function (req, res, next) {
	Wine.create(req.body)
	.then(function(newWine) {
		res.status(201).json(newWine)
	})
	.then(null, next)
})

router.put('/:wineId', function (req, res, next) {
	req.wine.set(req.body)
  	req.wine.save()
  	.then(function(updatedWine){
    res.json(updatedWine);
  	})
  	.then(null, next);
})

router.delete('/:wineId', function (req, res, next) {
	req.wine.remove()
  	.then(function(){
    	res.sendStatus(204)
  	})
  	.then(null, next);
})

module.exports = router;
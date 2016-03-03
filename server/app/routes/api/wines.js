var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Wine = mongoose.model('Wine')



router.get('/', function(req, res) {
	Wine.find({})
	.then(function(wines) {
		res.json(wines)
	})
	.then(null, next)
})

router.get('/:id', function(req, res) {
	var id = req.params.id
	Wine.findById(id)
	.then(function(wine) {
		res.json(wine)
	})
	.then(null, next)
})

router.get('/:id/reviews', function(req, res) {
	var id = req.params.id
	Wine.findReviews(id)
	.then(function(reviews) {
		res.json(reviews)
	})
	.then(null, next)
})

router.get('/:id/rating', function(req, res) {
	var id = req.params.id
	Wine.findById(id)
	.then(function(wine) {
		return wine.findRating()
	})
	.then(function(rating) {
		res.json(rating)
	})
	.then(null, next)
})

//on accesssible to admins
//perhaps need to consider preventing duplicate posts
router.post('/', function(req, res) {
	Wine.create(req.body)
	.then(function(newWine) {
		res.json(newWine)
	})
	.then(null, next)
})

router.put('/:id', function(req, res) {
	var id = req.params.id
	Wine.findByIdAndUpdate(id, {$set: req.body}, {new: true, runValidators: true})
	.then(function(updatedWine) {
		res.json(updatedWine)
	})
	.then(null, next)
})

router.delete('/:id', function(req, res) {
	var id = req.params.id
	Wine.findByIdAndRemove({_id: id})
	.then(function() {
		res.sendStatus(204)
	})
	.then(null, next)
})

// maybe...
// router.delete('/:id/reviews/:reviewId' ...

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

router.get('/', function(req, res) {
	mongoose.model('Wine')
	.find({})
	.then(function(wines) {
		res.json(wines)
	})
	.then(null, function(err) {
		console.log(err)
	})
})

router.get('/:id', function(req, res) {
	var id = req.params.id
	mongoose.model('Wine')
	.findById(id)
	.then(function(wine) {
		res.json(wine)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

router.get('/:id/reviews', function(req, res) {
	var id = req.params.id
	mongoose.model('Wine')
	.findById(id)
	.then(function(wine) {
		wine.findReviews()
	})
	.then(function(reviews) {
		res.json(reviews)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

router.get('/:id/rating', function(req, res) {
	var id = req.params.id
	mongoose.model('Wine')
	.findById(id)
	.then(function(wine) {
		wine.findRating()
	})
	.then(function(rating) {
		res.json(rating)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

router.post('/', function(req, res) {
	mongoose.model('Wine')
	.create(req.body)
	.then(function(newWine) {
		res.json(newWine)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

router.put('/:id', function(req, res) {
	var id = req.params.id
	mongoose.model('Wine')
	.findByIdAndUpdate(id, {$set: req.body}, {new: true, runValidators: true})
	.then(function(updatedWine) {
		res.json(updatedWine)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

router.delete('/:id', function(req, res) {
	var id = req.params.id
	mongoose.model('Wine')
	.findByIdAndRemove({_id: id})
	.then(function() {
		res.sendStatus(204)
	})
	.then(null, function(err) {
		console.log(err)
		res.sendStatus(404)
	})
})

// maybe...
// router.delete('/:id/reviews/:reviewId' ...

modules.exports = router;
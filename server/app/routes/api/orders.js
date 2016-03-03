var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../../../db/models/order');

var Order = mongoose.model('Order');

router.get('/', function (req, res, next) {
	Order.find()
	.then(function(orders) {
		res.json(orders);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	var newOrder = req.body;
	Order.create(newOrder)
	.then(function(order) {
		res.json(order);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next) {
	Order.findById(req.params.id)
	.then(function(order) {
		res.json(order);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	var changedOrder = req.body;
	Order.findOneAndUpdate({_id: req.params.id}, changedOrder, { new:true })
	.then(function(order) {
		res.json(order);
	})
	.then(null, next);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../../../db/models/order');

var Order = mongoose.model('Order');

router.param('id', function (req, res, next, id) {
	Order.findById(req.params.id)
	.then(function (order) {
		req.order = order;
		next();
	})
	.then(null, next);
});

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
		res.status(201).json(order);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.order);
});

router.put('/:id', function (req, res, next) {
	var changedOrder = req.body;
	req.order.set(changedOrder);
	req.order.save()
	.then(function (order) {
		res.json(order);
	});
});

module.exports = router;
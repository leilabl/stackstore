var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../../../db/models/order');

var Order = mongoose.model('Order');

router.param('orderId', function (req, res, next, orderId) {
	Order.findById(req.params.orderId)
	.then(function (order) {
		req.order = order;
		next();
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	console.log('user: ', req.user.toString())

	if (req.user.isAdmin) {
		Order.find()
		.then(function(orders) {
			res.json(orders);
		})
		.then(null, next);
	} else {
		res.sendStatus(403);
	}
});

router.post('/', function (req, res, next) {
	var newOrder = req.body;
	if (!req.user.isAdmin) newOrder.owner = req.user._id;
	Order.create(newOrder)
	.then(function(order) {
		res.status(201).json(order);
	})
	.then(null, next);
});

router.get('/:orderId', function (req, res, next) {
	if (req.user._id === req.order.owner || req.user.isAdmin) {
		res.json(req.order);
	} else {
		res.status(403).end();
	}
});

router.put('/:orderId', function (req, res, next) {
	if (req.user._id === req.order.owner || req.user.isAdmin) {
		var changedOrder = req.body;
		req.order.set(changedOrder);
		req.order.save()
		.then(function (order) {
			res.json(order);
		});
	} else {
		res.status(403).end();
	}
});

module.exports = router;
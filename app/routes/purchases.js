var express = require('express');
var util = require('util');
var Purchase = require('../models/purchase');
var PurchaseStatus = require('../models/purchaseStatus');

var api = express.Router();

//HTTP GET	
api.get('/purchases', function(req, res) {
	Purchase.find({}, function(err, purchases) {
		if (err) {
			res.json({message : err.message});
		} else {
			res.json(purchases);
		}
	}).populate({
		path: 'supplier',
		select: 'name'
	}).populate({
		path: 'status',
		select: 'name'
	}).populate({
		path: 'products.product',
		select: 'name'
	});
});

//HTTP POST
api.post('/purchases', function(req, res) {
	//create purchase
	Purchase.create({
		description : req.body.description,
		supplier : req.body.supplier,
		status : req.body.status
	}, function(err, purchase) {
		if (err) {
			res.json({message : err.message});
		} else if (!purchase) {
			res.json({message : 'Failed to add purchase!'});
		} else {
			Purchase.findByIdAndUpdate(
				purchase._id,
				{ $push: { products: { $each: req.body.products } } }
			, function(err, newPurchase) {
				if (err) {
					res.json({message : err.message});
				} else {
					res.json(newPurchase);
				}
			});
		}
	});
});

module.exports = api;
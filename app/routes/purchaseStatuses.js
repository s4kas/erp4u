var express = require('express');
var util = require('util');
var PurchaseStatus = require('../models/purchaseStatus');

var api = express.Router();

//HTTP GET
api.get('/purchasestatuses', function(req, res) {
	PurchaseStatus.find({}, function(err, products) {
		if (err) {
			res.json({message : err.message});
		} else {
			res.json(products);
		}
	});
});

//HTTP POST
api.post('/purchasestatuses', function(req, res) {
	PurchaseStatus.create({
		name : req.body.name
	}, function(err, product) {
		if (err) {
			res.json({message : err.message});
		} else if (!product) {
			res.json({message : 'Failed to add purchase status!'});
		} else {
			res.json(product);
		}
	});
});
	
module.exports = api;
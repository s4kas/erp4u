var express = require('express');
var util = require('util');
var ProductType = require('../models/productType');

var api = express.Router();

//HTTP GET
api.get('/producttypes', function(req, res) {
	ProductType.find({}, function(err, products) {
		if (err) {
			res.json({message : err.message});
		} else {
			res.json(products);
		}
	});
});

//HTTP POST
api.post('/producttypes', function(req, res) {
	ProductType.create({
		name : req.body.name
	}, function(err, product) {
		if (err) {
			res.json({message : err.message});
		} else if (!product) {
			res.json({message : 'Failed to add product type!'});
		} else {
			res.json(product);
		}
	});
});
	
module.exports = api;
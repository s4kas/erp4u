var express = require('express');
var util = require('util');
var Product = require('../models/product');

var api = express.Router();

//HTTP GET
api.get('/products', function(req, res) {
	Product.find({}, function(err, products) {
		if (err) {
			res.json({message : err.message});
		} else {
			res.json(products);
		}
	}).populate({
		path: 'type',
		select: 'name'
	});
});

//HTTP POST
api.post('/products', function(req, res) {
	Product.create({
		name : req.body.name,
		description : req.body.description,
		type : req.body.type
	}, function(err, product) {
		if (err) {
			res.json({message : err.message});
		} else if (!product) {
			res.json({message : 'Failed to add product!'});
		} else {
			res.json(product);
		}
	});
});
	
module.exports = api;
var express = require('express');
var mongoose = require('mongoose');
var util = require('util');
var Supplier = require('../models/supplier');

var api = express.Router();

//HTTP GET
api.get('/suppliers', function(req, res) {
	Supplier.find({}, function(err, suppliers) {
		if (err) {
			res.json({message : err.message});
		} else {
			res.json(suppliers);
		}
	});
});

//HTTP POST
api.post('/suppliers', function(req, res) {
	Supplier.create({
		name : req.body.name
	}, function(err, supplier) {
		if (err) {
			res.json({message : err.message});
		} else if (!supplier) {
			res.json({message : 'Failed to add supplier!'});
		} else {
			res.json(supplier);
		}
	});
});
	
module.exports = api;
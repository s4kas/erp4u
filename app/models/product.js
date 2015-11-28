var mongoose = require('mongoose');
var ProductType = require('../models/productType');
var Schema = mongoose.Schema;

var product = mongoose.model('Product', {
    name : {type : String, required: true, index: true, unique : true},
	description : {type : String, default: ''},
	dateCreated : {type : Date, default: Date.now},
	type : {type : Schema.Types.ObjectId, ref: 'ProductType'}
});

module.exports = product;
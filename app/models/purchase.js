var mongoose = require('mongoose');
var Supplier = require('../models/supplier');
var Product = require('../models/product');
var PurchaseStatus = require('../models/purchaseStatus');
var Schema = mongoose.Schema;

var purchase = mongoose.model('Purchase', {
    description : {type : String, default: '', required: true, unique: true},
	date : {type : Date, default: Date.now},
	supplier : {type : Schema.Types.ObjectId, required: true, ref: 'Supplier'},
	products : [{
		product: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
		quantity: {type : Number, required: true},
		quantityPrice: {type : Number, required: true}
	}],
	status : {type : Schema.Types.ObjectId, required: true, ref: 'PurchaseStatus'}
});

module.exports = purchase;
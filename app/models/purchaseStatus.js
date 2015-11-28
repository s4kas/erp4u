var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseStatus = mongoose.model('PurchaseStatus', {
	name : {type : String, default: '', required: true, unique:true},
	dateCreated : {type : Date, default: Date.now}
});

module.exports = purchaseStatus;
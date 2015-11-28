var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplier = mongoose.model('Supplier', {
    name : {type : String, default: '', required: true, unique: true},
	dateCreated : {type : Date, default: Date.now}
});

module.exports = supplier;
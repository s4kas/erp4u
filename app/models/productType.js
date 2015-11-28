var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productType = mongoose.model('ProductType', {
    name : {type : String, default: '', required: true, unique: true},
    dateCreated : {type : Date, default: Date.now}
});

module.exports = productType;
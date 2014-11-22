var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
    quote: String,
    author: String,
    publishOnDate: {type: Date, unique:true, sparse: true},
    bgColor: String,
    fgColor: String
})

module.exports = mongoose.model('Quote', quoteSchema);
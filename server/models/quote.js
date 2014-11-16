var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
    quote: String,
    author: String,
    publishOnDate: Date,
    bgColor: String,
    fgColor: String
})

module.exports = mongoose.model('Quote', quoteSchema);
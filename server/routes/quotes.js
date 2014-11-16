Quote = require('../models/quote')

exports.index = function(req, res){
    Quote.find(function(err, quotes){
        if(err){
            res.send(err);
        }
        res.send(quotes);
    })
};

exports.create = function(req, res){
    quote = new Quote;
    quote.quote = req.body.quote;
    quote.author = req.body.author;
    quote.publishOnDate = req.body.publishOnDate;
    quote.bgColor = req.body.bgColor;
    quote.fgColor = req.body.fgColor;
    quote.save(function(err, quote){
        if(err){
            res.send(err);
        }
        res.send(quote)
    });
}

exports.show = function(req, res){
    Quote.findById(req.params.id, function(err, quotes){
        if(err){
            res.send(err);
        }
        res.send(quotes);
    })
}

exports.show_by_date = function(req, res){
    date = new Date(req.params.year, req.params.month-1, req.params.day);
    Quote.findOne({publishOnDate: date}, function(err, quote){
        res.send(quote);
    })

}

exports.update = function(req, res){
    Quote.findById(req.params.id, function(err, quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        quote.publishOnDate = req.body.publishOnDate;
        quote.bgColor = req.body.bgColor;
        quote.fgColor = req.body.fgColor;
        quote.save();
        res.send(quote);
    })
}
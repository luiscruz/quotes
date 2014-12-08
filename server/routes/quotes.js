Quote = require('../models/quote');
var webshot = require('webshot');


exports.index = function(req, res){
    console.log('yuay')
    if (! req.user) {
        return res.send(401);
    }
    Quote.find().sort('-publishOnDate').exec(function(err, quotes){
        if(err){
            res.send(err);
        }
        res.send(quotes);
    })
};

take_snapshot = function(path){
    options = {
      screenSize: {
        width: 1200
          , height: 630
      }
    , shotSize: {
        width: 1200
      , height: 'all'
      }
    , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
       + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
      quality: 100,
      takeShotOnCallback: true,
      
    }

    webshot(path, 'flickr.jpeg', options, function(err) {
      // screenshot now saved to flickr.jpeg
    });
}

exports.create = function(req, res){
    if (! req.user) {
        return res.send(401);
    }
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
    if (! req.user) {
        return res.send(401);
    }
    Quote.findById(req.params.id, function(err, quotes){
        if(err){
            res.send(err);
        }
        res.send(quotes);
    })
}

exports.show_by_date = function(req, res){
    today = new Date();
    date = new Date(req.params.year, req.params.month-1, req.params.day);
    if (date > today && !req.user) {
        return res.send(401);
    }
    Quote.findOne({publishOnDate: date}, function(err, quote){
        res.send(quote);
    })

}

exports.update = function(req, res){
    if (! req.user) {
        return res.send(401);
    }
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
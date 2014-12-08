Quote = require('../models/quote');
var webshot = require('webshot');


exports.index = function(req, res){
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

take_snapshot = function(quote){
    console.log('taking webshot for '+quote.id);
    options = {
      screenSize: {
        width: 800
          , height: 630
      },
      quality: 100,
      timeout: 15000,
      takeShotOnCallback: true,
    }
    dir = 'webshots/'
    date_string = quote.publishOnDate.getFullYear() + '/' + (quote.publishOnDate.getMonth() + 1)+ '/' + quote.publishOnDate.getDate();
    filename = date_string + '.jpeg';
    console.log(filename)
        console.log('aquote.herokuapp.com/'+date_string);
    webshot('https://aquote.herokuapp.com/'+date_string, dir+filename, options, function(err) {
      // screenshot now saved to flickr.jpeg
        console.log(err);
        console.log('webshot finish')
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
        take_snapshot(quote)
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
        take_snapshot(quote)
        res.send(quote);
    })
}
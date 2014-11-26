var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    quotes_routes = require('./routes/quotes'),
    serveStatic = require('serve-static');
var appRoot = require('app-root-path');
    
var app = express();

// for parsing application/json
app.use(bodyParser.json());

//connect to MongoDB database
//mongoose.connect('mongodb://localhost/quotes');
mongoose.connect('mongodb://heroku_app31979237:h69v11qvkd0j2l2cp4666n2oiv@ds051750.mongolab.com:51750/heroku_app31979237');

app.use('/app', serveStatic('app'))
app.use('/bower_components', serveStatic('bower_components'))

app.get('/api/quotes', quotes_routes.index);
app.post('/api/quotes', quotes_routes.create);

app.get('/api/quotes/:id', quotes_routes.show);
app.get('/api/quotes/:year/:month/:day', quotes_routes.show_by_date)

// app.post('/quotes', quotes_routes.create);
app.put('/api/quotes/:id', quotes_routes.update);
// app.delete('/quotes/:id', quotes_routes.delete);

app.all('/*', function(req, res) {
    res.sendFile(appRoot +'/app/index.html');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');
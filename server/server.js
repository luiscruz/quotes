var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    quotes_routes = require('./routes/quotes'),
    serveStatic = require('serve-static');
    
var app = express();

// for parsing application/json
app.use(bodyParser.json());

//connect to MongoDB database
mongoose.connect('mongodb://localhost/quotes');

app.get('/quotes', quotes_routes.index);
app.post('/quotes', quotes_routes.create);

app.get('/quotes/:id', quotes_routes.show);
app.get('/quotes/:year/:month/:day', quotes_routes.show_by_date)

// app.post('/quotes', quotes_routes.create);
app.put('/quotes/:id', quotes_routes.update);
// app.delete('/quotes/:id', quotes_routes.delete);


 app.use('/app', serveStatic('app'))
 app.use('/bower_components', serveStatic('bower_components'))

app.listen(3000);
console.log('Listening on port 3000...');
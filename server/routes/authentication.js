var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var session       = require('express-session');

User = require('../models/user')


exports.initialize = function(app){
    app.use(session({ secret: 'aquote secret' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
    
    app.post('/api/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info){
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                return res.send(401);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({ success : true, message : 'authentication succeeded', 'session_id':req.sessionID });
            });
        })(req, res, next);
    });
    
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

}
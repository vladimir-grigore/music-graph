const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport')
const SpotifyStrategy = require('./lib/passport-spotify/index').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var dotEnvPath = path.resolve('../.env');
require('dotenv').config({ path: dotEnvPath});
var appKey = process.env.CLIENT_ID;
var appSecret = process.env.CLIENT_SECRET;

//////////// Spotify OAuth ///////////////
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new SpotifyStrategy({
    clientID: appKey,
    clientSecret: appSecret,
    callbackURL: process.env.NODE_ENV === 'production' ? 'https://musicgraph.herokuapp.com/callback' : 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }));
//////////// Spotify OAuth ///////////////

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(session({ secret: 'music graph' }));
app.use(cookieParser('music graph'));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//////////// Spotify OAuth ///////////////
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-private'], showDialog: true}),
  function(req, res){});

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

app.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});
//////////// Spotify OAuth ///////////////

app.get('/', (req, res) => {
  res.render('index', {
    bundleSrc: process.env.NODE_ENV === 'production' ? '/bundle.js' : 'http://localhost:8081/bundle.js',
    user: req.user
  });
});

const server = app.listen(app.get('port'), () => {
  const address = server.address();
  console.log(`Server listening on ${address.port}`);
});

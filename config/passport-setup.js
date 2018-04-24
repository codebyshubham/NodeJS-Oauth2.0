const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config();
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

passport.use(
  new GoogleStrategy({
  // options for strategy
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: 'http://localhost:3000/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile);
    User.findOne({googleId: profile.id})
      .then((currentUser) => {
        if (currentUser) {
            console.log('user : ', currentUser);
            done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            userName: profile.displayName,
            profilePic: profile._json.image.url,
          })
          .save()
          .then((newUser) => {
            console.log('new User Created ', newUser);
            done(null, newUser);
          });
        }
      })
      .catch((err) => console.error(err));
  })
);
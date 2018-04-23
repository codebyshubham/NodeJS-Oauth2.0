const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv').config();

passport.use(
  new GoogleStrategy({
  // options for strategy
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: 'http://localhost:3000/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile);
  })
);
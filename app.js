const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIEKEY],
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose
mongoose.connect(process.env.MONGODBHOST, { 
  auth: {
    user: process.env.MONGOUSER, password: process.env.MONGOPASSWORD,
  }}, () => {
    console.log('connected to mongodb');
  }
);

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3000, () => console.log('listning on port 3000'));
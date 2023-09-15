const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = new express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const coreRoute = require('./routes/core');
const usersRoute = require('./routes/users')
const methodOverride = require('method-override');
const reportRoute = require('./routes/reportsRoute');
const Database = require('./Database');
require('dotenv').config()
Database()  

// Passport Config
require('./config/passport')(passport);


mongoose.set('strictQuery', true);


// MiddleWARES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


// Issue Model

const { render } = require('ejs');
const { request } = require('http');
const { error } = require('console');


app.use('/', coreRoute)
app.use('/reports/', reportRoute);
app.use('/users', usersRoute)



const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is Listening on Port ${serverPort}........`)
} )
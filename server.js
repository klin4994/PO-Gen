require('dotenv').config()
const express = require('express')
const session = require('express-session')

const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3001
const passport = require('./config/passport')
// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true })
)

// Initialize middleware, intialize passport
app.use(passport.initialize())
// Initialize middleware to alter the request object and deserialize "user" session ID from the request into a proper user object
app.use(passport.session())
// Add routes, both API and view
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/products_db'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

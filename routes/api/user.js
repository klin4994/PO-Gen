const router = require('express').Router()
const userController = require('../../controller/userController')
const passport = require('../../config/passport')

// user loggin post request
router.post('/login/', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

// check if a user has been authenticated by verifying the isAuthenticated() property provided by passport.js
router.get('/logged-in', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() })
})

// use .logout() to log out
router.get('/logout', (req, res) => {
  req.logout()
  res.send(200)
})

module.exports = router

const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("../../config/passport");


// check if a user has been authenticated by verifying the isAuthenticated() property provided by passport.js
router.get("/logged-in", (req, res) => {
  res.json({isAuthenticated:req.isAuthenticated()});
});


// user loggin post request
router.post('/login/', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
});
  // .post("/login", passport.authenticate("local"), (req, res) => {
  //   res.json(req.user);
  //   console.log("req.user");
  // });
  
module.exports = router;

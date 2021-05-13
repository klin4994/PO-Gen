const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("../../config/passport");


router.get ('/logged-in/')
router.post('/login/', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
});
  // .post("/login", passport.authenticate("local"), (req, res) => {
  //   res.json(req.user);
  //   console.log("req.user");
  // });
module.exports = router;

const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("../../config/passport");

// router
//   .route("/")
//   .get(userController.findAll)
//   .post(
//     passport.authenticate('local'), function(req, res) {
//       res.redirect('/');
//     }
//   );
router.post('/', passport.authenticate('local', (req, res) => {
  console.log(req, "req")
  console.log(res, "res")
  //res.json(req.user);
  // console.log(req.user);
}));
  // .post("/login", passport.authenticate("local"), (req, res) => {
  //   res.json(req.user);
  //   console.log("req.user");
  // });
module.exports = router;

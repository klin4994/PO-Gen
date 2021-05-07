const router = require("express").Router();
const productsController = require("../../controller/productsController");
const passport = require("../../controller/passport");

// Matches with "/api/products"
router
  .post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
    console.log(req.user);
  });
module.exports = router;

const router = require("express").Router();
const productRoutes = require("./products");
const loginRoutes = require("./login");

// Product routes
router.use("/products", productRoutes);
router.use("/login", loginRoutes);
module.exports = router;

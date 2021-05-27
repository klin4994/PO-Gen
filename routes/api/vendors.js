const router = require('express').Router()
const vendorsController = require('../../controller/vendorsController')

router
  .route('/')
  .get(vendorsController.findAll)

module.exports = router

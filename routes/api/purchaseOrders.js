const router = require('express').Router();
const POController = require('../../controller/purchaseOrdersController')

router
    .route('/last')
    .get(POController.findLast)

module.exports = router
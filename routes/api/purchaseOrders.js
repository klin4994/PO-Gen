const router = require('express').Router();
const POController = require('../../controller/purchaseOrdersController')

router
    .route('/last')
    .get(POController.findLast)
    
router
    .route('/create')
    .post(POController.addPO)
module.exports = router
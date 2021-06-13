const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const POSchema = new Schema ({
    po_number:{
        type: String,
        trim: true
    }
}, { collection: 'purchase_orders' })

const PurchaseOrders = mongoose.model('PurchaseOrders', POSchema);

module.exports = PurchaseOrders;

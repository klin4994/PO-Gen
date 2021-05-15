const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VendorSchema = new Schema ({
    key: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    contact_email: {
        type: String,
        trim: true
    },
    contact_number: {
        type: String,
        trim: true
    }
}, {collection: 'vendors'})

const Vendors = mongoose.model("Vendors", VendorSchema);

module.exports = Vendors;
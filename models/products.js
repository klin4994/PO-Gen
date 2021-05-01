const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VDSchema = new Schema ({
  key : {
    type: String,
    trim: true
  },  
  name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true  
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
})

const RMSchema = new Schema({
  key: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  unit_price: {
    type: Number
  },
  unit: {
    type: String,
    trim: true
  },
  coefficient: {
    type: Number
  },
  vendor: [VDSchema]
}, { _id : false })

const PTSchema = new Schema({
  key: {
    type: String
  },
  dosageForm: {
    type: String
  },
  qtyPerPack: {
    type: Number,
    trim: true
  },
  packaging: {
    type: String,
    trim: true
  },
  formulation: [RMSchema]
});

const Products = mongoose.model("Products", PTSchema);

module.exports = Products;


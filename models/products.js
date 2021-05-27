const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
  vendor_name: {
    type: String,
    trim: true
  },
  vendor_email: {
    type: String,
    trim: true
  }
}, { _id: false })

const PTSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  key: {
    type: String
  },
  name: {
    type: String,
    trim: true
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
}, { collection: 'products' })

const Products = mongoose.model('Products', PTSchema)

module.exports = Products

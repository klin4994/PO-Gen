let mongoose = require('mongoose');
let {Products, Users} = require('../models')


mongoose.connect("mongodb://localhost/products_db"), {
    useNewUrlParser: true,
    useFindAndModify: false
}

let productsSeed = [
    {   user:"6093c20ad150a04ab444bc95",
        key: "PT001",
        dosageForm: "Tablet",
        name: "Vitamin C - 20S",
        qtyPerPack: 20,
        packaging: "Box(blisters)",
        formulation: [
            {
                key: "RM001",
                name: "Raw material 1",
                unit_price: 95,
                unit: "kg",
                coefficient: 150,
                vendor_name: "Vendor 1",
                vendor_email: "vendor1@email.com",
            },
            {
                key: "RM002",
                name: "Raw material 2",
                unit_price: 165,
                unit: "kg",
                coefficient: 500,
                vendor_name: "Vendor 1",
                vendor_email: "vendor1@email.com",
            },
            {
                key: "RM003",
                name: "Raw material 3",
                unit_price: 80,
                unit: "kg",
                coefficient: 50,
                vendor_name: "Vendor 3",
                vendor_email: "vendor3@email.com",
            },
        ]
    },
    {
        key: "PT002",
        qtyPerPack: 60,
        packaging: "Bottle",
        dosageForm: "Capsule",
        name: "FatBurner - 60S",
        formulation: [
            {
                key: "RM003",
                name: "Raw material 1",
                unit_price: 130,
                unit: "kg",
                coefficient: 700,
                vendor_name: "Vendor 2",
                vendor_email: "vendor2@email.com",
            },
            {
                key: "RM004",
                name: "Raw material 4",
                unit_price: 30,
                unit: "kg",
                coefficient: 900,
                vendor_name: "Vendor 2",
                vendor_email: "vendor2@email.com",
            },
            {
                key: "RM005",
                name: "Raw material 5",
                unit_price: 320,
                unit: "kg",
                coefficient: 40,
                vendor_name: "Vendor 2",
                vendor_email: "vendor2@email.com",
            },
            
        ]
    },
]

let usersSeed = [
    {   _id: "6093c20ad150a04ab444bc95",
        company: "Company 1",
        email: "c1@email.com",
        password: "$2a$10$PQsjsDIZ2DkJEhuG.EWyr.rktERsd7xUz2.ULDJkJBfxMIDUl53FW",
        address: "Address 1"
    },
    {
        company: "Company 2",
        email: "c2@email.com",
        password: "$2a$10$fN9nUcvUvXGagsrdv3XNBOfnDxi6EFeYGAsSqmn2MHgQDBcBcFiOm",
        address: "Address 2"
    }
]
Products.deleteMany({})
  .then(() => Products.collection.insertMany(productsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

Users.deleteMany({})
.then(() => Users.collection.insertMany(usersSeed))
.then(data => {
console.log(data.result.n + " records inserted!");
process.exit(0);
})
.catch(err => {
console.error(err);
process.exit(1);
});
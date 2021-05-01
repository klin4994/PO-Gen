let mongoose = require('mongoose');
let db = require('../models/products.js')

mongoose.connect("mongodb://localhost/products_db"), {
    useNewUrlParser: true,
    useFindAndModify: false
}

let productsSeed = [
    {
        key: "PT001",
        dosageForm: "Tablet",
        qtyPerPack: 20,
        packaging: "Box(blisters)",
        formulation: [
            {
                key: "RM001",
                name: "Raw material 1",
                unit_price: 95,
                unit: "kg",
                coefficient: 150,
                vendor_name: "Company 1",
                vendor_email: "company1@email.com",
            },
            {
                key: "RM002",
                name: "Raw material 2",
                unit_price: 165,
                unit: "kg",
                coefficient: 500,
                vendor_name: "Company 2",
                vendor_email: "company2@email.com",
            },
            {
                key: "RM003",
                name: "Raw material 3",
                unit_price: 80,
                unit: "kg",
                coefficient: 50,
                vendor_name: "Company 3",
                vendor_email: "company3@email.com",
            },
        ]
    },
    {
        key: "PT002",
        qtyPerPack: 60,
        packaging: "Bottle",
        dosageForm: "Capsule",
        formulation: [
            {
                key: "RM003",
                name: "Raw material 1",
                unit_price: 130,
                unit: "kg",
                coefficient: 700,
                vendor_name: "Company 1",
                vendor_email: "company1@email.com",
            },
            {
                key: "RM004",
                name: "Raw material 4",
                unit_price: 30,
                unit: "kg",
                coefficient: 900,
                vendor_name: "Company 1",
                vendor_email: "company1@email.com",
            },
            {
                key: "RM005",
                name: "Raw material 5",
                unit_price: 320,
                unit: "kg",
                coefficient: 40,
                vendor_name: "Company 1",
                vendor_email: "company1@email.com",
            },
            
        ]
    },
]
db.deleteMany({})
  .then(() => db.collection.insertMany(productsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

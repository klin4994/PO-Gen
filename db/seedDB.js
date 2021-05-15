let mongoose = require('mongoose');
let {Products, Users, Vendors} = require('../models')


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
                unit: "KG",
                coefficient: 150,
                vendor_name: "Vendor 1 Pty Ltd",
                vendor_email: "vendor1@email.com",
            },
            {
                key: "RM002",
                name: "Raw material 2",
                unit_price: 165,
                unit: "KG",
                coefficient: 500,
                vendor_name: "Vendor 1 Pty Ltd",
                vendor_email: "vendor1@email.com",
            },
            {
                key: "RM003",
                name: "Raw material 3",
                unit_price: 80,
                unit: "KG",
                coefficient: 50,
                vendor_name: "Vendor 3 Pty Ltd",
                vendor_email: "vendor3@email.com",
            },
        ]
    },
    {
        user:"6093c20ad150a04ab444bc95",
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
                unit: "KG",
                coefficient: 700,
                vendor_name: "Vendor 2 Pty Ltd",
                vendor_email: "vendor2@email.com",
            },
            {
                key: "RM004",
                name: "Raw material 4",
                unit_price: 30,
                unit: "KG",
                coefficient: 900,
                vendor_name: "Vendor 2 Pty Ltd",
                vendor_email: "vendor2@email.com",
            },
            {
                key: "RM005",
                name: "Raw material 5",
                unit_price: 320,
                unit: "KG",
                coefficient: 40,
                vendor_name: "Vendor 2 Pty Ltd",
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
        _id: "609f2d140491995370654992",
        company: "Company 2",
        email: "c2@email.com",
        password: "$2a$10$fN9nUcvUvXGagsrdv3XNBOfnDxi6EFeYGAsSqmn2MHgQDBcBcFiOm",
        address: "Address 2"
    }
]

let vendorsSeed = [
    {   
        key: "VD001",
        name: "Vendor 1 Pty Ltd",
        contact_email: "v1@email.com",
        contact_number: "111-222-333"
    },
    {
        key: "VD002 2",
        name: "Vendor 2 Pty Ltd",
        contact_email: "v2@email.com",
        constact_number: "222-222-333"
    },
    {
        key: "VD003",
        name: "Vendor 3 Pty Ltd",
        contact_email: "v2@email.com",
        constact_number: "333-222-333"
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

Vendors.deleteMany({})
.then(() => Vendors.collection.insertMany(vendorsSeed))
.then(data => {
console.log(data.result.n + " records inserted!");
process.exit(0);
})
.catch(err => {
console.error(err);
process.exit(1);
});
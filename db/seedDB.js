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
        formulation:  [
            {
              "key": "RM074",
              "name": "Raw Material 74",
              "unit": "KG",
              "unit_price": 44,
              "coefficient": 445,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM036",
              "name": "Raw Material 36",
              "unit": "KG",
              "unit_price": 92,
              "coefficient": 755,
              "vendor_name": "Vendor 3 Pty Ltd"
            },
            {
              "key": "RM068",
              "name": "Raw Material 68",
              "unit": "KG",
              "unit_price": 93,
              "coefficient": 236,
              "vendor_name": "Vendor 3 Pty Ltd"
            },
            {
              "key": "RM058",
              "name": "Raw Material 58",
              "unit": "KG",
              "unit_price": 114,
              "coefficient": 823,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM023",
              "name": "Raw Material 23",
              "unit": "KG",
              "unit_price": 59,
              "coefficient": 638,
              "vendor_name": "Vendor 2 Pty Ltd"
            },
            {
              "key": "RM037",
              "name": "Raw Material 37",
              "unit": "KG",
              "unit_price": 42,
              "coefficient": 118,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM065",
              "name": "Raw Material 46",
              "unit": "KG",
              "unit_price": 114,
              "coefficient": 621,
              "vendor_name": "Vendor 3 Pty Ltd"
            },
            {
              "key": "RM070",
              "name": "Raw Material 70",
              "unit": "KG",
              "unit_price": 87,
              "coefficient": 131,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM085",
              "name": "Raw Material 85",
              "unit": "KG",
              "unit_price": 77,
              "coefficient": 167,
              "vendor_name": "Vendor 3 Pty Ltd"
            },
            {
              "key": "RM055",
              "name": "Raw Material 55",
              "unit": "KG",
              "unit_price": 64,
              "coefficient": 158,
              "vendor_name": "Vendor 2 Pty Ltd"
            },
            {
              "key": "RM083",
              "name": "Raw Material 83",
              "unit": "KG",
              "unit_price": 44,
              "coefficient": 476,
              "vendor_name": "Vendor 2 Pty Ltd"
            },
            {
              "key": "RM038",
              "name": "Raw Material 38",
              "unit": "KG",
              "unit_price": 122,
              "coefficient": 508,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM001",
              "name": "Raw Material 1",
              "unit": "KG",
              "unit_price": 66,
              "coefficient": 204,
              "vendor_name": "Vendor 2 Pty Ltd"
            },
            {
              "key": "RM009",
              "name": "Raw Material 9",
              "unit": "KG",
              "unit_price": 27,
              "coefficient": 377,
              "vendor_name": "Vendor 3 Pty Ltd"
            },
            {
              "key": "RM030",
              "name": "Raw Material 30",
              "unit": "KG",
              "unit_price": 66,
              "coefficient": 791,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM003",
              "name": "Raw Material 3",
              "unit": "KG",
              "unit_price": 33,
              "coefficient": 201,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM017",
              "name": "Raw Material 17",
              "unit": "KG",
              "unit_price": 120,
              "coefficient": 859,
              "vendor_name": "Vendor 1 Pty Ltd"
            },
            {
              "key": "RM041",
              "name": "Raw Material 41",
              "unit": "KG",
              "unit_price": 87,
              "coefficient": 990,
              "vendor_name": "Vendor 3 Pty Ltd"
            }
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
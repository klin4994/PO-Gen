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
                vendor: [
                        {
                            key: "VD001",
                            name: "Company 1",
                            address: "Address 1",
                            email: "Email 1",
                            phone: "Phone 1"
                        }
                    ]
            },
            {
                key: "RM002",
                name: "Raw material 2",
                unit_price: 165,
                unit: "kg",
                coefficient: 500,
                vendor: [
                    {
                        key: "VD002",
                        name: "Company 2",
                        address: "Address 2",
                        email: "Email 2",
                        phone: "Phone 2"
                    }
                ]
            },
            {
                key: "RM003",
                name: "Raw material 3",
                unit_price: 80,
                unit: "kg",
                coefficient: 50,
                vendor: [
                    {
                        key: "VD003",
                        name: "Company 3",
                        address: "Address 3",
                        email: "Email 3",
                        phone: "Phone 3"
                    }
                ]
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
                name: "Raw material 3",
                unit_price: 130,
                unit: "kg",
                coefficient: 700,
                vendor: [
                    {
                        key: "VD003",
                        name: "Company 3",
                        address: "Address 3",
                        email: "Email 3",
                        phone: "Phone 3"
                    }
                ]
            },
            {
                key: "RM004",
                name: "Raw material 4",
                unit_price: 30,
                unit: "kg",
                coefficient: 900,
                vendor: [
                    {
                        key: "VD004",
                        name: "Company 4",
                        address: "Address 4",
                        email: "Email 4",
                        phone: "Phone 4"
                    }
                ]
            },
            {
                key: "RM005",
                name: "Raw material 5",
                unit_price: 320,
                unit: "kg",
                coefficient: 40,
                vendor: [
                    {
                        key: "VD006",
                        name: "Company 6",
                        address: "Address 6",
                        email: "Email 6",
                        phone: "Phone 6"
                    }
                ]
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

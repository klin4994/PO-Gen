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

let usersSeed = [
    {   _id: "6093c20ad150a04ab444bc95",
        company: "Company 1",
        email: "c1@email.com",
        password: "$2y$10$mIzDPHPeuVUFZrmF6qGnheZ4H2URRxF7PAQAnQ5ZhHm/5MBcjxg3y ",
        address: "Address 1"
    },
    {
        company: "Company 2",
        email: "c2@email.com",
        password: "$2y$10$MQIjCBpRoTZrhJOAij3iqu8DGL9V4HTD3nxsZCkqM/vT4kA66EsDG ",
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
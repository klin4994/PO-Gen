const db= require('../models');
const POs = db.PurchaseOrders

module.exports = {
    findLast: function (req, res) {
        POs 
            .find ({})
            .sort({ _id:-1 })
            .limit(1)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        POs
            .create (req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}
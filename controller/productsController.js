const db = require('../models')
const Products = db.Products

module.exports = {
    findAll: function (req, res) {
        Products
        .find(req.query)
        .sort({ code:1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}
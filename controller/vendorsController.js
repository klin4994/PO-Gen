const db = require('../models')
const Vendors = db.Vendors

module.exports = {
  findAll: function (req, res) {
    Vendors
      .find(req.query)
      .sort({ key: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    Vendors
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }

}

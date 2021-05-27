const db = require('../models')
const Users = db.Users

module.exports = {
  findAll: function (req, res) {
    Users
      .find(req.query)
      .sort({ code: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    Users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }

}

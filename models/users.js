const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    company: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
},{ collection: 'users' })


const Users = mongoose.model("Users", UserSchema);

module.exports = Users;


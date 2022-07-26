const mongoose = require('mongoose')
const User = require('./userSchema')
const visitorSchema = new mongoose.Schema({
    visitor_ip: {
        type: String,
        unique: true,
        required: true,
    },
    visitor_city: {
        type: String
    },
    visitor_pincode: {
        type: String
    },
    visited: {},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

module.exports = mongoose.model('Visitor', visitorSchema, 'visitors')
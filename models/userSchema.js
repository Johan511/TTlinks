const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
   email: String,
   name: String,
   auth: String
},{timestamps: true})

module.exports = mongoose.model('User', userSchema, 'users')
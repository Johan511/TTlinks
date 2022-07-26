const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
    },
    courseTT: {
        type: [String]
    },
    tutorialTT: {
        type: [String]
    },
    tutorialhref: {}

})

module.exports = courseSchema
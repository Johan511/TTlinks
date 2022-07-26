const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    batchName: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },
    heading: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
    },

    isPinned: {
        type: Boolean,
        default: false
    },
    isAnnouncement: {
        type: Boolean,
        default: false
    },
    expireAt: {
        type: Date,
        expires: 0
    }
}, {
    timestamps: true,
    expiresAfterSeconds: 0

})


module.exports = mongoose.model('Message', messageSchema, 'messages')
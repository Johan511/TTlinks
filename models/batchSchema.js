const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ttlinks')
const courseSchema = require('./courseSchema')
const Message = require('./messageSchema')



const batchSchema = new mongoose.Schema({
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: Message }],

        batchName: {
            type: String,
            uppercase: true,
            required: true,
            trim: true
        },
        courses: {

            type: [courseSchema]
        }
    }

)

module.exports = mongoose.model('Batch', batchSchema, 'batches')
getLink = {}
const batches = require('../models/batchSchema.js')
getLink.getLink = async function(batch, course) {
    try {
        const batchObject = await batches.findOne({ batchName: batch })
        var courseObject
        for (i of batchObject.courses) {

            if (i.courseName == course) {
                courseObject = i
                break
            }
        }
        let date = new Date()
        date = new Date(date.getTime() + (330 - 12) * 60000) //add time in ms (5.5 hrs - 12 min)
        day_hour = date.getDay().toString() + (date.getHours() - 7).toString()
        for (i of courseObject.courseTT) {

            if (i.slice(0, 2) == day_hour) {
                return i.split('&&')[1]
            } else if (i.slice(0, 1) == date.getDay().toString()) {
                return i.split('&&')[1]
            }
        }

        throw new Error('no class today')
    } catch (error) {
        if (error.message == 'no class today') {
            let err_container = {}
            err_container.err = error
            err_container.err.code = 404
            return err_container
        }
        error.message = 'no such course exists for your batch'
        let err_container = {}
        err_container.err = error
        err_container.err.code = 404
        return err_container
    }
}


module.exports = getLink
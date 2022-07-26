const batchRouter = require('express').Router();
const batches = require('../models/batchSchema');
const messages = require('../models/messageSchema');
const { saveVisitor } = require('../utilities/saveVisitor');
const{verifyLogin} = require('../utilities/authentication');
batchRouter.get('/:batch', (req, res, next) => {
    res.render('batch.hbs', { layout: false })

});

batchRouter.get('/:batch/getTT', saveVisitor ,(req, res, next) => {
    batches.findOne({ batchName: req.params.batch }, (err, batch) => {

        if (err) {
            next(err);
        }
        batch.populate('messages', (err, batch) => {
            if (err) {
                console.log(err)
                return next(err)
            }
            res.send(batch);
        })
    })
})

batchRouter.post('/:batch/addMessage',verifyLogin ,async(req, res, next) => {
    req.body['expireAt'] ? req.body['expireAt'] = new Date().getTime() + (req.body['expireAt'] * 1000 * 86400) : req.body['expireAt'] = new Date().getTime() + (1 * 1000 * 86400)
    req.body['author'] = req.user.name || req.user.email.splice(0,8)

    if (req.body.heading === '' || req.body.message === '') {return next()}
    
    message = await messages.create(req.body).catch(err => {
        res.send(err)
        console.log(err)
        return next(err)
    })
    batches.findOne({ batchName: req.params.batch }, (err, batch) => {
        batch.messages.push(message._id)
        batch.save()
    })
    res.status(200).send('message-added')
    return next()
})

batchRouter.post('/:batch/add', async(req, res, next) => {
    batchData = req.body;

    await batches.create(batchData)
    next()
})

module.exports = batchRouter;
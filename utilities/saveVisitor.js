saveVisitor = {}
const geoIP = require('geoip-lite')
const true_user = require('../models/userSchema')
const User = require('../models/visitorSchema')
const jwt_decode = require('jwt-decode')
saveVisitor.saveVisitor = async function(req, res, next) {
try {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // let ip = '49.204.133.56'
    if(req.cookies.sid){
        const sid_payload = jwt_decode(req.cookies.sid)
        const true_user_id = await true_user.findOne({ email: sid_payload.email })
        await User.updateOne({'visitor_ip' : ip}, {$set: {'user': true_user_id._id}}).catch(err => {console.log("can not update user", err)})

    }
    let geoip = geoIP.lookup(ip);
    geoip.ip = ip
    let url = req.originalUrl
    let user = (await User.find({ visitor_ip: geoip.ip }))[0]
  
    if (!user) {

        let userObject = {}
        userObject.visitor_ip = geoip.ip
        userObject.visitor_city = geoip.city
        userObject.visitor_pincode = geoip.metro
        userObject.visited = {}
        userObject.visited[url] = 1
        await new User(userObject).save()
        return next();
    } else {

        if (user.visited[url]) {

            user.visited[url] += 1
        } else {

            user.visited[url] = 1
        }
    }
    user.markModified('visited')
    await user.save();
    return next()
} catch (error) {
    console.log(error)
    return next()
}


 

}

module.exports = saveVisitor
const jwt = require('jsonwebtoken')

function repToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name
    }

    return jwt.sign(payload, process.env.REP_SECRET)
}

module.exports = {repToken}
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')
const user = require('../models/userSchema')

var login_opts = {
    secretOrKey: process.env.REP_SECRET,
    jwtFromRequest: (req) => {
        
        return req.cookies['sid']
        
    }
}


passport.use('login-jwt-strategy', new jwtStrategy(login_opts, (jwt_payload, done) => {
    done(null, jwt_payload)

}))


const verifyLogin = passport.authenticate('login-jwt-strategy', { session: false, failureRedirect: "/" })

module.exports = { verifyLogin}

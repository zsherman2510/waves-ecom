const {User} = require('../models/user')
require('dotenv').config();

const {Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
    try{
        const user = await User.findById(payload.sub);
        if(!user){ 
            return done(null, false)
        }
        done(null, user)
    }catch(err){
        done(error, false)
    }
}

const jwtStrategy = new JWTStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy
}
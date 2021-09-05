const passport = require('passport');
const {ApiError} = require('./apiError');
const httpStatus = require('http-status');
const {roles} = require('../config/roles')

const verify = (req, res, resolve, reject, rights) => async(err, user) =>{
    
    if(err || !user){
        return reject (new ApiError(httpStatus.UNAUTHORIZED, "sorry you not authorized"))
    }
    req.user = user;
    if(rights.length){
        const action = rights[0] //createAny, ReadAny
        const resource = rights[1] //profile, user etc
        const permission = roles.can(req.user.role)[action](resource);
        
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN, "You dont have the permission"))
        }
        res.locals.permission = permission;
    } 
    
    
    
    //resolve because we have a user
    resolve()
}

const auth = (...rights) => async(req, res, next) => {
    
    return new Promise((resolve, reject) => {
        
        passport.authenticate(
          "jwt",
          { session: false },
          verify(req, res, resolve, reject, rights))
          (req, res, next)
        
    })
    .then(() => next())
    .catch(err => next(err));
}

module.exports = auth;
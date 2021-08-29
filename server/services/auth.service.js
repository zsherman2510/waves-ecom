const {User} = require('../models/user')
const httpStatus = require('http-status')
const {ApiError} = require('../middleware/apiError')
const userService = require('./user.service')
const createUser = async (email, password, firstname, lastname) => {
    try{
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email has been taken')
            
        }
        
        const user = new User({
            email, password, firstname, lastname
        });
        await user.save();
        return user;
    } catch(err){
        throw err;
    }
}

const genAuth = async (user) => {
    const token = user.generateAuthToken();
    return token
}

const signInWithUser = async (email, password) => {
  try {
    console.log(email);
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Email or password is incorrect"
      );
    }
    
    if(!(await user.comparePassword(password))){
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Email or password is incorrect"
        );
    }
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
    createUser, genAuth, signInWithUser
    
}
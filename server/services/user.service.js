const {User} = require("../models/user")
const {ApiError} = require('../middleware/apiError')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const findUserByEmail = async(email) => {
    console.log(email + 'hello');
    return User.findOne({ email: email})
}


const findUserById = async (_id) => {
    console.log(_id);
  return User.findById(_id);
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        //edit this to only pass what i want
        "$set": {
          ...req.body.data,
        },
      },
      // makes sure it returns the new updated copy of the object
      { new: true }
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (err) {}
};

const updateUserEmail = async (req) => {
  try {
    

    if (await User.emailTaken(req.body.newemail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }
    
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id, email: req.user.email
      },
      {
        //edit this to only pass what i want
        "$set": {
          email: req.body.newemail,
          verified: false
        },
      },
      // makes sure it returns the new updated copy of the object
      { new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (err) {
      throw err;
  }
};

const validateToken =  async(token)=> {
  return jwt.verify(token, process.env.DB_SECRET)
}
module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken
};
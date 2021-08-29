const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config();
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firstname: {
    type: String,
    required: false,
    maxLength: 100,
    trim: true,
    default: ""
  },
  lastname: {
    type: String,
    required: false,
    maxLength: 100,
    trim: true,
    default: ""
  },
  cart: {
      type: Array,
      default: []
  },
  history: {
      type: Array, 
      default: []
  },
  verified: {
      type: Boolean,
      default: false
  },
});

userSchema.pre('save', async function(next){
  let user = this;
  
  if(user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    
  }
  
  next();
  
})

userSchema.methods.generateAuthToken = function(){
  let user = this;
  const userObj = { sub: user._id.toHexString(), email:user.email};
  const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '1d'});
  return token;
  
}

userSchema.methods.generateRegisterToken = function () {
  let user = this;
  const userObj = { sub: user._id.toHexString() };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "5m" });
  return token;
};


userSchema.statics.emailTaken = async function(email) {
  const user = await this.findOne({email: email});
  return !!user;
}
userSchema.methods.comparePassword = async function(candidatePassword){
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password )
  return match;
}

const User = mongoose.model('User', userSchema);
module.exports = {User};

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxlength: 100,
    
  },
  
});

brandSchema.statics.brandTaken = async function(name){
    const brand = await this.findOne({name});
    
    return !!brand;
}

const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
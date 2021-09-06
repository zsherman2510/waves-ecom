const { Brand } = require("../models/brand");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addBrand = async (name) => {
  try{
      if(await Brand.brandTaken(name)){
          throw new ApiError(httpStatus.BAD_REQUEST, 'Brand already taken');
      }
      
      const brand = new Brand({
          name
      });
      
      await brand.save();
      return brand;
      
      
  }catch(err){
      throw err;
  }
};

const getBrandById = async(id) => {
 try{

    const brand = await Brand.findById(id);   
    if(!brand) throw new ApiError(httpStatus.BAD_REQUEST,"brand not found");     
    return brand;
 } catch(err){
     throw err;
 }
  
  
};

const getBrands = async (args) => {
  try {
      
    let order = args.order ? args.order : "asc";
    let limit = args.limit ? args.limit : 200
    
    const brands = await Brand.find({}).sort([
        ["_id", order]
    ]).limit(limit);
    if (!brands) throw new ApiError(httpStatus.BAD_REQUEST, "brand not found");
    return brands;
  } catch (err) {
    throw err;
  }
};

const deleteBrand = async (id) => {
  try {
    const brand = await Brand.findByIdAndRemove(id);
    
    return brand;
  } catch (err) {
    throw err;
  }
};
const updateBrand = async (req) => {
  try {
    const brand = await Brand.findOneAndUpdate({
        _id: req.brand._id,
    },
    { "$set" : { 
        ...req.body.data.name
    },},
    {new: true}
    
    );
    
    if(!brand) {
        throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    }


    return brand;
  } catch (err) {
    throw err;
  }
};

module.exports = {
    addBrand, getBrandById, deleteBrand, updateBrand, getBrands
}
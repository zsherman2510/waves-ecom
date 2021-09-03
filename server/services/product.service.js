const { Product } = require("../models/product");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require('mongoose');

const addProduct = async (req) => {
  try {
      console.log(req);
    if (await Product.productTaken(req.model)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product already taken");
    }

    const product = new Product({
      ...req
    });

    await product.save();
    return product;
  } catch (err) {
    throw err;
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id).populate("brand");
    if (!product) throw new ApiError(httpStatus.BAD_REQUEST, "product not found");
    return product;
  } catch (err) {
    throw err;
  }
};

const getProducts = async (req) => {
  try {

    const products = await Product.find({}).populate('brand')
      .sort([[req.query.sortBy, req.query.order]])
      .limit(parseInt(req.query.limit));
    if (!products) throw new ApiError(httpStatus.BAD_REQUEST, "product not found");
    return products;
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndRemove(id);

    return product;
  } catch (err) {
    throw err;
  }
};


const updateProduct = async (id, req) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        id
      },
      {
        "$set": {
          req
        },
      },
      { new: true }
    );

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    return product;
  } catch (err) {
    throw err;
  }
};
//search functionality
const paginateProducts = async (req) => {

    try{
        
        let queryArray = [];
        //Check the keywords or whatevery you wnat to name it
        if(req.body.keywords && req.body.keywords != ''){
            // `gi` - globals, case insensitive
            const re = new RegExp(`${req.body.keywords}`, 'gi');
            
            queryArray.push({
                $match: {model: { $regex:re}}
            })
            
        }
        // we need to wrap the brands id like this ObjectId(89472983472984729)
        if(req.body.brands && req.body.brands.length > 0){
            let brandsArray = req.body.brands.map((item)=> (
                mongoose.Types.ObjectId(item)
            ));
            // use $in for array
            queryArray.push({
              $match: { brand: { $in: brandsArray } },
            });
        }
        
        if (
          (req.body.min && req.body.min > 0) ||
          (req.body.max && req.body.max < 5000)
        ) {
          if (req.body.min) {
              
            // gt is greater than
            queryArray.push({ $match: { price: { $gt: req.body.min } } });
          }
          if (req.body.max) {
              
            // gt is greater than
            queryArray.push({ $match: { price: { $lt: req.body.max } } });
          }
        }
        
        /// add populate to show the brand name when we search
        
        queryArray.push({
            $lookup: { 
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand",
                
            },
        // unwind returns an object instead of an array of objects    
        }, {$unwind: '$brand'})
        
        let aggQuery = Product.aggregate(queryArray);
        
        const options = { 
            page: req.body.page,
            limit:5,
            sort: {date: 'desc'}
        }
        
        const products = await Product.aggregatePaginate(aggQuery,options);
        return products;
        
    }catch(err){
        throw err;
    }
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  paginateProducts,
};

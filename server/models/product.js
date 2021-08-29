const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")
require("dotenv").config();


const productSchema = mongoose.Schema({
  model: {
    type: String,
    required: [true, "product name is required"],
    maxlength: 100
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  price: {
    type: Number,
    required: true,
    maxlength: 255
  },
  description: {
    required: true,
    type: String,
    maxlength: 10000  
  },
  available: {
    type: Number,
    required: true,
    default: 0,
    maxlength: 100
  },
  itemSold: {
    type: Number,
    default: 0,

  },
  shipping: {
      type: Boolean,
      require: true,
      default: false
  },
  images: {
      type: Array,
      default: []
  },
  date:{
      type: Date,
      default: Date.now
  }
  
});

productSchema.statics.productTaken = async function (model) {
  const product = await this.findOne({model});

  return !!product;
};

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
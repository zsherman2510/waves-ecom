const { productService } = require("../services");
const httpStatus = require("http-status");

const { ApiError } = require("../middleware/apiError");

const productsController = {
  async addProduct(req, res, next) {
    try {
      
      const product = await productService.addProduct(req.body);

      res.status(httpStatus.CREATED).json(product);
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.getProduct(id);

      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  async getProducts(req, res, next) {
    try {
   
      const products = await productService.getProducts(req);

      res.json(products);
    } catch (err) {
      next(err);
    }
  },
  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.deleteProduct(id);

      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.updateProduct(id, req);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  async paginateProducts(req, res, next) {
    console.log(req);
    try {
      
      const products = await productService.paginateProducts(req);
      res.json(products);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productsController;

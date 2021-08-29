const { brandService, authService, emailService } = require("../services");
const httpStatus = require("http-status");

const { ApiError } = require("../middleware/apiError");

const brandsController = {
  async addBrand(req, res, next) {
    try {
        const {name} = req.body
        const brand = await brandService.addBrand(name);
        
        res.status(httpStatus.CREATED).json(brand);
    } catch (error) {
      next(error);
    }
  },
  
  async getBrand(req, res, next){
      try{
          const id = req.params.id;
          const brand = await brandService.getBrandById(id);
    
          
          res.json(brand);
      } catch(err){
          next(err);
      }
      
  },
  async getBrands(req, res, next){
      try{
          
          const brands = await brandService.getBrands(req.body);
    
          
          res.json(brands);
      } catch(err){
          next(err);
      }
      
  },
  async deleteBrand(req, res, next){
      try{
          
          const id = req.params.id;
          const brand = await brandService.deleteBrand(id);
    
          
          res.json(brand);
      } catch(err){
          next(err);
      }
      
  },
  async updateBrand(req, res, next){
      try{
          
          const brand = await brandService.updateBrand(req);
          res.json(brand);
          
      } catch(err){
          next(err);
      }
      
  }
 
};

module.exports = brandsController;

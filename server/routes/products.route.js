const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();
const auth = require("../middleware/auth");
const {addProductValidator} = require("../middleware/validation")
const formidableMiddleware = require("express-formidable");

router
  .route("/product/:id")
  .get(productsController.getProduct)
  .delete(auth("deleteAny", "products"), productsController.deleteProduct)
  .patch(auth("updateAny", "products"), productsController.updateProduct);

router.get("/all", productsController.getProducts);
router.post("/", auth("createAny", "products"),addProductValidator, productsController.addProduct);

router.post('/paginate/all', productsController.paginateProducts)

router.post('/upload', auth("createAny","products"), formidableMiddleware(),productsController.picUpload)

module.exports = router;

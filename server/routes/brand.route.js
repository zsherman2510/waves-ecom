const express = require("express");
const brandsController = require("../controllers/brands.controller");
const router = express.Router();
const auth = require("../middleware/auth");


router.route('/brand/:id')
.get(brandsController.getBrand)
.delete(auth("deleteAny", "brands"), brandsController.deleteBrand)
.patch(auth("updateAny", "brands"), brandsController.updateBrand);

router.get('/all', brandsController.getBrands);
router.post("/brand", auth('createAny', 'brands'), brandsController.addBrand);

module.exports = router;

const {check, validationResult} = require('express-validator');
const httpStatus = require('http-status');


const addProductValidator = [
  check("model")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add model")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum characters is 3.")
    .bail(),

  check("brand")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add a brand")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum characters is 3."),
    (req, res, next)=> {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status( httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }
];

module.exports = {
    addProductValidator
}
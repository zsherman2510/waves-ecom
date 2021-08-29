const {authService, emailService} = require('../services/index')
const httpStatus = require('http-status')
const authController = {
    async register(req, res, next){
        try{
            const {email, password, firstname, lastname} = req.body;
            const user = await authService.createUser(email, password, firstname, lastname);
            const token = await authService.genAuth(user);
            
            await emailService.registerEmail(email,user);
            
            res.cookie('x-access-token', token).status(httpStatus.CREATED).send({
                user
            })
            
        } catch (err) {
            
            next(err)
        }
    },
    async signin(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await authService.signInWithUser(email, password)
            const token = await authService.genAuth(user);
            res
              .cookie("x-access-token", token)
              .send({
                user,
                token
              });
            
        } catch (err){
            next(err);
        }
    },
    async isAuth(req, res, next){
       res.json(req.user)
    }
}

module.exports = authController;
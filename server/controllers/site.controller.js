const {siteService} = require('../services');
const {ApiError} = require('../middleware/apiError');
const {Site} = require('../models/site');

const siteController = {
    async postSiteArgs(req, res, next) {
        try{
            const site = new Site({
                ...req.body
            });
            
            await site.save();
            
            res.json(site);
        }catch(err){
            throw err;
        }
    }
}

module.exports = siteController;

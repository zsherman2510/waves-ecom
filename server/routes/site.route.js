const express = require("express");
const siteController = require("../controllers/site.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router.route('/')
.post(auth('createAny', 'site'), siteController.postSiteArgs)

module.exports = router;
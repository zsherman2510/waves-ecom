const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
  address: {
    require: true,
    type: String,
  },
  hours: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
});

const Site = mongoose.model('Site', siteSchema);
module.exports = {Site}
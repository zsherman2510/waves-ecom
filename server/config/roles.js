const AccessControl = require('accessControl');

const allRights = { 
    'create:any':['*'],
    'read:any':['*'],
    'update:any':['*'],
    'delete:any':['*']
    
}
let grantsObject = {
  admin: {
    profile: allRights,
    brands: allRights,
    products: allRights,
    site: allRights
  },
  user: {
    profile: {
      "read:own": ["*", "!password", '!_id'],
      "update:own": ["*"]
    },
    brands: {
      "read:any": ["*"]
    },
    products: {
      "read:any": ["*"]
    },
    site: {
      "read:any": ["*"]
    }
  },
};

const roles = new AccessControl(grantsObject)

module.exports = {
    roles
}
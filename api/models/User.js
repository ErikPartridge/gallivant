/**
* User.js
*
* @description :: This is the user model, when one calls the API, we check against this.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'userDatabase',

  attributes: {
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    schema: true,
    privateKey : {
      type : 'string'
    },
    publicKey : {
      type : 'string'
    },
    universalRead : {
      type : 'boolean'
    },
    transactions: {
      collection: 'transaction',
      via: 'user'
    },

  },

  setApiKeys: function (options, cb) {
    User.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      theUser.privateKey = ApiKey.privateKey({});
      theUser.publicKey = ApiKey.publicKey({});
      var cache = require("memory-cache");
      cache.put(theUser.id + "-pri", theUser.privateKey, 10000);
      cache.put(theUser.id + "-pub", theUser.publicKey, 10000);
      theUser.save(cb);
    });
  }
};


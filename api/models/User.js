/**
* User.js
*
* @description :: This is the user model, when one calls the API, we check against this.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'userDatabase',

  attributes: {
    privateKey : {
      type : 'string'
    },
    publicKey : {
      type : 'string'
    },

  },

  setApiKeys: function (options, cb) {
    var crypto = require('crypto');
    var base64url = require('base64url');
    User.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      theUser.privateKey = ApiKey.privateKey();
      theUser.publicKey = ApiKey.publicKey();
      theUser.save(cb);
    });
  }
};


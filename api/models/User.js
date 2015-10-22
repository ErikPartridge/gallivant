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
    apiKeys : {
      collection :'apikey',
      via: 'user'
    },
    universalRead : {
      type : 'boolean'
    },
    transactions: {
      collection: 'transaction',
      via: 'user'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.apiKeys;
      return obj;
    }
  },


  // This is a rather expensive transaction. On a fast computer, this is ~50ms, on a slow computer, easily ~200ms
  addApiKey: function (options, cb) {
    User.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      ApiKey.create({user : theUser}).exec(function(err, res){
        if(err)
          console.log(err);
        else{
          var cache = require("memory-cache");
          cache.put(theUser.id + "-pri", res.privateKey, 10000);
          cache.put(theUser.id + "-pub", res.publicKey, 10000);
          theUser.transactions.add(res);
          theUser.save(cb);
        }
      });
    });
  },
  deleteApiKey : function(options, cb){
    ApiKey.destroy({id: options.id}).exec(function(err, theKey){

    });
  }
};


/**
* ApiKey.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection : 'userDatabase',

  attributes: {
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    schema: true,
    privateKey : {
      type : 'string',
      defaultsTo : ''
    },
    publicKey : {
      type : 'string',
      defaultsTo : ''
    },
    user: {
      model : 'user'
    }
  },
  beforeCreate: function(values, next) {
    values.privateKey = KeyGenerator.privateKey({});
    values.publicKey = KeyGenerator.publicKey({});
    next();
  }
};


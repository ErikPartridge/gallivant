/**
* Failure.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection : 'failuresDatabase',
  attributes: {
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    schema: true,
    ip : 'string',
    userId : 'string',
    remarks : 'string'
  }

};


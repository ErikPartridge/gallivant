var crypto = require("crypto");
var base64url = require("base64url");
exports.privateKey = function(options){
  var size = 100;
  if(options.size){
    size = options.size;
  }
  var randomBytes = crypto.randomBytes(size);
  return base64url(randomBytes);
};

exports.publicKey = function(options){
  var size = 60;
  if(options.size){
     size = options.size;
  }
  var randomBytes = crypto.randomBytes(size);
  return base64url(randomBytes);
};

var crypto = require("crypto");

/**
 * @returns The user id if it's valid, otherwise, returns false
 * @param req
 */
exports.check = function(req){
  var millis = req.param("millis");
  var current = Date.now().UTC;
  if(millis < current && current - 600000 < millis) {
    User.findOne({id: req.userId}).exec(function (err, user) {
      if (!err) {
        var privateKey = user.privateKey;
        var hmac = crypto.createHmac("sha512", privateKey);
        hmac.update(millis + "." + user.publicKey + "." + req.method + "." + req.path.toUpperCase());
        var hash = hmac.digest("hex");
        console.log(req.path.toUpperCase());
        if (hash !== req.param("hash")) {
          Failure.create({
            ip: req.ip,
            userId: req.param("id"),
            remarks: "Key authentication failed"
          }).exec(function (err, failure) {});
          return false;
        } else {
          return true;
        }
      }
      return false;
    });
  }else{
    Failure.create({
      ip: req.ip,
      userId: req.param("id"),
      remarks: "Request timed out"
    }).exec(function (err, failure) {
    });
  }
};

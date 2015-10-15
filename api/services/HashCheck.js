var crypto = require("crypto");

/**
 * @returns The user id if it's valid, otherwise, returns false
 * @param req
 */
exports.check = function(req){
  if(!req.param("userId") || !req.param("millis") || !req.param("hash"))
    return false;

  var millis = req.param("millis");
  var current = Date.now();
  if(millis < current && current - 600000 < millis) {
    var ret;
    setTimeout(function() {
      User.findOne({
        id: req.param("userId")
      }).exec(function (err, user) {
        if (!err) {
          var privateKey = user.privateKey;
          var hmac = crypto.createHmac("sha512", privateKey);
          hmac.update(millis + "." + user.publicKey + "." + req.method + "." + req.path.toUpperCase());
          var hash = hmac.digest("hex");
          if (hash !== req.param("hash")) {
            Failure.create({
              ip: req.ip,
              userId: req.param("userId"),
              remarks: "Key authentication failed"
            }).exec(function (err, failure) {
            });
            ret =  false;
          } else {
            ret = user.id;
          }
        } else {
          ret = false;
        }
      })
    }, 4);
    while(ret === undefined) {

      require('deasync').runLoopOnce();
    }
    return ret;
  }else{
    Failure.create({
      ip: req.ip,
      userId: req.param("userId"),
      remarks: "Request timed out"
    }).exec(function (err, failure) {
    });
    return false;
  }
};

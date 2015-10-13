
module.exports = function(req, res, next){
  var now = Date.now();
  var hourAgo = Date.now();
  hourAgo = hourAgo.setHours(now.getHours() - 2);
  req.ips.forEach(function(addr){
    var failures = Failure.find({ip : addr, createdAt : {'>': hourAgo}});
    if(failures.length > 65){
      return res.forbidden('You have exceeded the maximum allowed failures for this time.');
    }
  });
  return next();
};

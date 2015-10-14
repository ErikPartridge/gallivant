
module.exports = function(req, res, next){
  var now = Date.now();
  var hourAgo = Date.now();
  hourAgo = hourAgo.setHours(now.getHours() - 2);
  req.ips.forEach(function(addr){
    Failure.find({ip : addr, createdAt : {'>': hourAgo}}).exec(function(err, failures){
      if(!err && failures.length < 65){
        return next();
      }else{
        return res.forbidden("Found on blacklist");
      }
    });
  });
};

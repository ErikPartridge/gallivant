/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function(req, res){
    User.create({privateKey : '', publicKey : '', universalRead : true}).exec(function(err, user){
      User.setApiKeys({id : user.id}, function(err, resu){
        res.json(user);
      });
    });
  },
  index : function(req, res){
    //This should only be accessible from localhost
    if(req.ip.indexOf("127.0.0.1") > -1){
      User.find({}).exec(function(err, users){
        if(!err){
          res.json(users);
        }else{
          winston.log('error', err);
        }
      });
    }else{
      //Tell 'em no go
      res.json(403, { error: 'You do not have sufficient credentials to view this resource' });
    }
  }
};


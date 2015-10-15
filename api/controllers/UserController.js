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
  }
};


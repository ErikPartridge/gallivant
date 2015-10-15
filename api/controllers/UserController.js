/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {post} /user/:id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
	create : function(req, res){
    User.create({privateKey : '', publicKey : '', universalRead : true}).exec(function(err, user){
      User.setApiKeys({id : user.id}, function(err, resu){
        res.json(user);
      });
    });
  }
};


/**
 * TransactionController
 *
 * @description :: Server-side logic for managing Transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var HashCheck = require('../services/HashCheck.js');
module.exports = {
  /**
   * @api {get} /api/v1/transactions List user's transactions
   * @apiName ListTransactions
   * @apiGroup Transactions
   * @apiVersion 0.1.0
   * @apiParam {Integer} [count]  How many records to retrieve, default 100.
   * @apiParam {String} userId The user's id code
   * @apiParam {Integer} millis  The millisecond time of the submission. Can be done from browser or server, but within 1 second of request.
   * @apiParam {String} hash     Mandatory hash computed in the standard format (millis.pubkey.METHOD_UPPER.PATH_UPPER), in hex form, created with SHA512 using private key
   * @apiDescription Will provide a list of all transactions executed by the authenticated user, in the last 7 days, unless time is provided
   * @apiSuccess {Array} - A list of transactions
   * @apiError 403 Not authorized
   * @apiError 404 No such resource
   */
	index : function(req, res){
    var check = HashCheck.check(req);
    // This won't be true, but it will be something, usually a string or int
    if(check){
      var count = 100;
      if(req.param("count") && !isNan(req.param("count"))){
        count = req.param("count");
      }
      User.findOne({where : { id : check} , limit : count, sort : 'createdAt DESC'}).exec(function(err, user){
        if(!err){
          res.json()
        }else{
          res.json(404, {error : "No such resource"});
        }
      });
    }else{
      res.json(403, {error : "Not authorized to view this resource, this has been reported"});
    }
  }
};


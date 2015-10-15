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
   * @apiParam {Auth} auth  The standard authentication components
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
      Transaction.find({where : { user : check} , limit : count, sort : 'createdAt DESC'}).exec(function(err, transactions){
        if(!err){
          res.json(transactions);
        }else{
          res.json(404, {error : "No such resource"});
        }
      });
    }else{
      res.json(403, {error : "Not authorized to view this resource, this has been reported"});
    }
  },

  /**
   * @api {get} /api/v1/transactions Show a transaction
   * @apiName ShowTransactions
   * @apiGroup Transactions
   * @apiVersion 0.1.0
   * @apiParam {Integer} [count]  How many records to retrieve, default 100.
   * @apiParam {Auth} auth  The standard authentication components
   * @apiDescription Will provide a the given transaction, if the user is authorized to view it
   * @apiSuccess {String} type the type of transaction
   * @apiSuccess {String} remarks any remarks that accompany the transaction
   * @apiSuccess {Date} createdAt the time it was created at
   * @apiSuccess {String} user the user's id
   * @apiError 403 Not authorized
   * @apiError 404 No such resource
   */
  show : function(req, res) {
    var check = HashCheck.check(req);
    // This won't be true, but it will be something, usually a string or int
    if (check) {
      Transaction.findOne({where: {user: check, id: req.id}}).exec(function (err, transaction) {
        if (!err) {
          res.json(transaction);
        } else {
          res.json(404, {error: "No such resource"});
        }
      });
    } else {
      res.json(403, {error: "Not authorized to view this resource, this has been reported"});
    }
  }
};


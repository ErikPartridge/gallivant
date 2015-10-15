/**
 * FailureController
 *
 * @description :: Server-side logic for managing Failures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var winston = require('winston');

module.exports = {
  /**
   * @api {get} /api/v1/failures List authentication failures on this server
   * @apiName ListFailures
   * @apiGroup Failure
   * Only available to administrators
   * @apiSuccess {String} ip IP Address of the request
   * @apiSuccess {String} userId The user id that they attempted to use
   * @apiSuccess {String} remarks General remarks and logging info about the failure
   */
  index : function(req, res){
    console.log(req.ip);
    //This should only be accessible from localhost
    if(req.ip.indexOf("127.0.0.1") > -1){
      Failure.find({}).exec(function(err, failures){
        if(!err){
          res.json(failures);
        }else{
          winston.log('error', err);
        }
      });
    }else{
      //Tell 'em no go
      winston.log('info', 'Attempt to access the list of failures from ip ' + req.ip);
      res.json(403, { error: 'You do not have sufficient credentials to view this resource' });
    }
  },
  show : function(req, res){
    if(req.ip.contains("127.0.0.1")){
      Failure.find({}).exec(function(err, failures){
        if(!err){
          res.json(failures);
        }else{
          winston.log('error', err);
        }
      });
    }else{
      winston.log('info', 'Attempt to access the list of failures from ip ' + req.ip);
      res.json(403, { error: 'You do not have sufficient credentials to view this resource' });
    }
  }
};


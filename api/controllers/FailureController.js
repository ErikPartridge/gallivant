/**
 * FailureController
 *
 * @description :: Server-side logic for managing Failures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var winston = require('winston');

module.exports = {
  /**
   * @api {get} /api/v1/failures List authentication failures
   * @apiName ListFailures
   * @apiGroup Failure
   * @apiVersion 0.1.0
   * @apiDescription Only available to administrators
   * @apiSuccess {Array} - A list of failures
   */
  index : function(req, res){
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

  /**
   * @api {get} /api/v1/failures/:id Find Failure
   * @apiName FindFailure
   * @apiGroup Failure
   * @apiVersion 0.1.0
   * @apiDescription Only available to administrators
   * @apiSuccess {String} ip IP Address of the request
   * @apiSuccess {String} userId The user id that they attempted to use
   * @apiSuccess {String} remarks General remarks and logging info about the failure
   */
  show : function(req, res){
    //This should only be accessible from localhost
    if(req.ip.indexOf("127.0.0.1") > -1){
      Failure.find({id : req.param("id")}).exec(function(err, failure){
        if(!err && !failure){
          res.json(failure);
        }else{
          winston.log('error', err);
          res.json(404, {error : 'No such failure with that id'});
        }
      });
    }else{
      winston.log('info', 'Attempt to access a failure from ip ' + req.ip);
      res.json(403, { error: 'You do not have sufficient credentials to view this resource' });
    }
  }
};


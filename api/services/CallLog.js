/**
 * Created by erik on 10/13/15.
 */
var Queue = require("bull");
var apiQueue = Queue('api call', 6379, '127.0.0.1');
apiQueue.process(function(job, done){
  var data = job.data.id;
  var call = job.data.call;
  //TODO post the data to the server here
  done();
});

exports.log =  function(req){
  apiQueue.add(req);
};

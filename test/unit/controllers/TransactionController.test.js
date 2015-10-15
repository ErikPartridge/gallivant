var request = require('supertest');
var crypto = require("crypto");

describe('TransactionController', function() {

  describe('#index()', function() {
    it('should respond with json', function (done) {
      User.create({privateKey : '', publicKey : '', universalRead : true}).exec(function(err, user){
        User.setApiKeys({id : user.id}, function(err, resu){
          User.find({id : user.id}).exec(function(err, theUser){
            var milli = Date.now().UTC;
            var privateKey = user.privateKey;
            var hmac = crypto.createHmac("sha512", privateKey);
            hmac.update(milli + "." + theUser.publicKey + "." + "GET" + "." + "/API/V1/TRANSACTIONS");
            var hex = hmac.digest("hex");
            request(sails.hooks.http.app)
              .get('/api/v1/transactions')
              .send({hash : hex, millis : milli, userId : user.id})
              .expect('Content-Type', /json/)
              .expect(200, done);
          });
        });
      });
    });
  });

  describe('#index()', function(){
    it('should fail', function(done){
      request(sails.hooks.http.app)
        .get('/api/v1/transactions')
        .expect('Content-Type', /json/)
        .expect(403, done);
    });
  })

});

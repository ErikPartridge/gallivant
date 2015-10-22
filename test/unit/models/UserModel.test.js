/**
 * Created by erik on 10/14/15.
 */
var http = require('http');

describe('UserModel', function() {

  describe('#setApiKeys()', function() {
    it('should check setApiKeys function', function (done) {
      var url = 'http://localhost:1337/create';
      http.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
          var response = JSON.parse(body);
          var userId = response["id"];
          User.addApiKey({id : userId}, function(err,res){});
          User.find({id: userId}).populate('apiKeys').exec(function(err, keys){
            var keyOne = keys[0]['apiKeys'][0];
            if(keyOne.publicKey.length === 80 && keyOne.privateKey.length === 140){
              done();
            }else{
              throw err;
            }
          });
        });
      });
    });
  });

  describe('#keyCaching', function(){
    it('should make sure the keys are cached', function(done){
      var url = 'http://localhost:1337/create';
      http.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
          var response = JSON.parse(body);
          var userId = response["id"];
          User.addApiKey({id : userId}, function(err,res){});
          var cache = require("memory-cache");
          User.findOne({id: userId}).exec(function(err, user){
            if(cache.get(user.id + "-pub").length === 80 && cache.get(user.id + "-pri").length === 140){
              done();
            }else{
              throw new ReferenceError("No such value exists");
            }
          });
        });
      });
    });
  })

});

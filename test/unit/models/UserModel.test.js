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
          User.setApiKeys({id : userId}, function(err,res){});
          User.findOne({id: userId}).exec(function(err, user){
            if(user.publicKey.length === 80 && user.privateKey.length === 140){
              done();
            }else{
              throw err;
            }
          });
        });
      });
    });
  });

});

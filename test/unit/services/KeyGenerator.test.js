var ApiKey = require('../../../api/services/KeyGenerator.js');

describe('ApiKeyService', function() {

  describe('#publicKey()', function() {
    it('should test the public key length', function (done) {
        if(ApiKey.publicKey({}).length === 80) {
          done();
        }else{
          throw new RangeError("Size not 80 chars");
        }
    });
  });
  describe('#privateKey()', function(){
    it('should test the private key length', function (done){
      if(ApiKey.privateKey({}).length === 140){
        done();
      }else{
        throw new RangeError("Size not 140 chars");
      }
    })
  })

});

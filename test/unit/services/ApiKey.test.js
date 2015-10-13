var ApiKey = require('../../../api/services/ApiKey.js');
for(var i = 0; i < 5; i++) {
  console.log("Private " + ApiKey.privateKey({}).length);
  console.log("Public " + ApiKey.publicKey({}).length);
}

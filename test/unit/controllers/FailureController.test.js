var request = require('supertest');

describe('FailureController', function() {

  describe('#index()', function() {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures')
        .expect(200)
        .expect('Content-Type', /json/, done());
    });
  });

  describe('#show()', function() {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures/1')
        .expect(200)
        .expect('Content-Type', /json/, done());
    });
  });

  describe('#show()', function() {
    it('should respond with a json error', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures/321020123001')
        .expect(404)
        .expect('Content-Type', /json/, done());
    });
  });

});

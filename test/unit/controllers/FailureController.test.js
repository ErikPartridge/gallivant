var request = require('supertest');

describe('FailureController', function() {

  describe('#index()', function() {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });

  describe('#show()', function() {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures/1')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });

  describe('#show()', function() {
    it('should respond with a json error', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/failures/321020123001')
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  });

});

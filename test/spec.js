var request = require('supertest');

describe('hotels test', function () {
  var server;
  
  beforeEach(function () {
    server = require('../app');
  });

  it('GET /hotels 200 OK - list', function testSlash(done) {
    request(server)
        .get('/hotels')
        .expect(200, done);
    });

  it('POST /hotels 500 BAD REQUEST - create', function testPath(done) {
    request(server)
      .post('/hotels')
      .expect(500, done);
  });

  it('PUT /hotels/:id 404 NOT FOUND - update', function testPath(done) {
    request(server)
      .put('/hotels')
      .expect(404, done);
  });

  it('GET /hotels/:id 404 NOT FOUND - find one', function testPath(done) {
    request(server)
      .put('/hotels')
      .expect(404, done);
  });

  it('DELETE /hotels/:id 404 NOT FOUND - delete', function testPath(done) {
    request(server)
      .delete('/hotels')
      .expect(404, done);
  });
});
const request = require("supertest");

describe('GET /admin', function () {
    it('responds with json', function (done) {
        request("http://localhost:5001")
            .get('/admin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


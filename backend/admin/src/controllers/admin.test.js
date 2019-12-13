const request = require("supertest");

/*Testing the "secret" admin route with a simple request, since it does not require any paramaters.*/

describe('GET /admin', function () {
    it('responds with json', function (done) {
        request("http://localhost:5001")
            .get('/admin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


const request = require("supertest");


describe('POST /user', function() {
    it('responds with json', function(done) {
        request("http://localhost:5000")
            .post('/user')
            .send({name: 'testUser', songs: ["52oa213n12bnb321c", "52oa213n12bnb321d", "52oa213n12bnb321c", "52oa213n12bnb321c", "52oa213n12bnb321c"]})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/*Remove this comment to test a complete wipe out of the user collection after a heavy payload test.*/

/*
describe('DELETE /user/drop', function() {
    it('responds with json', function(done) {
        request("http://localhost:5000")
            .delete('/user/drop')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
*/

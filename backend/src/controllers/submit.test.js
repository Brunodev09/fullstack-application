const submit = require("./submit");
const request = require("supertest");

// let obj = new submit();

// test("submit a user and a list of songs for processing in the database", async () => {
//     const data = await obj.create({body: {name: "brunodev09"}});
//      expect(data).toBe({status: 200});
// });

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

// describe('DELETE /user/drop', function() {
//     it('responds with json', function(done) {
//         request("http://localhost:5000")
//             .delete('/user/drop')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });
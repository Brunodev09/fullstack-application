// Execute this file with node with the Submit service running to perfome a staged DDoS attack on the Submit service
// and watch it being prevented.
const axios = require('axios');
const t = 1; // Interval before next request in ms.
let counter = 0; // Request counter.
let req; // To-be-Request object.

// If the requests are to be considered a DDoS attack, the requests are going to be declined with the status code of 429.
// Else they are going to be declined with the code 404 for missing required paramaters for registration.

(() => {
    setInterval(async () => {
        try {
            console.log(`Request number ${counter} brute force request, again in ${t}`);
            req = await axios.post('http://localhost:5000/user', {});
            console.log(req);
            counter++;
        } catch (e) {
            counter++;
            console.error(e.message);
        }
    }, t);
})();
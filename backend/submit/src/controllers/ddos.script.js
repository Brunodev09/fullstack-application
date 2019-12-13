// Execute this file with Node.js, with the Submit service running to perfom a staged DDoS attack on the Submit service
// and watch it being prevented.
const axios = require('axios');
const t = 1; // Interval before next request in ms.
const servicePort = 5000;
let counter = 0; // Request counter.
let req; // To-be-Request object.

// If the requests are to be considered a DDoS attack, the requests are going to be declined with the status code of 429.
// Else they are going to be declined with the code 404 for missing required paramaters for registration.

(() => {
    setInterval(async () => {
        try {
            console.log(`Brute force request number ${counter}, again in ${t}...`);
            req = await axios.post(`http://localhost:${servicePort}/user`, {});
            console.log(req);
            counter++;
        } catch (e) {
            counter++;
            console.error(e.message);
        }
    }, t);
})();
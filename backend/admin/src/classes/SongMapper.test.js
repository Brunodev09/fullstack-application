const SongMapper = require('./SongMapper');

let list = [];
let chars = ["a", "b", "c", "d", "e", "f", "i", "o", "u"];

function makeName(n) {
    let str = "";
    while (str.length < n) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function makeList() {
    let l = [];
    for (let i = 0; i < 5; i++) {
        if (Math.floor(Math.random() * 10) % 2 === 0) l.push(chars[i]);
        else l.push("RANDOM_ID");
    }
    return l;
}

for (let i = 0; i < 100; i++) {
    list.push({ name: makeName(Math.floor(Math.random() * 8)), songs: makeList() });
}

let m = new SongMapper(list);
m.map();
console.log(JSON.stringify(m))

// test('Receives a list of users and returns a map of the most voted songs.', () => {
//     expect(Object.keys(m)).toHaveLength(list.length);
// });
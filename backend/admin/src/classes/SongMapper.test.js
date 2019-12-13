const SongMapper = require('./SongMapper');
/* Testing the SongMapper class by giving it an array of random user objects and expecting a map indexed by unique song
 * ids and valued by the number of times it has been voted. */


let list = [];
let chars = ["a", "b", "c", "d", "e", "f", "i", "o", "u"];
let usersFavoriteSongsNumber = 5;

function makeName(n) {
    let str = "";
    while (str.length < n) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function makeList() {
    let l = [];
    for (let i = 0; i < usersFavoriteSongsNumber - 1; i++) {
        if (Math.floor(Math.random() * 10) % 2 === 0) l.push(chars[i]);
        else l.push("RANDOM_ID");
    }
    return l;
}

for (let i = 0; i < 100; i++) {
    list.push({ name: makeName(8), songs: makeList() });
}

let m = new SongMapper(list);
m.map();

test('Receives a list of users and returns a map of the most voted songs.', () => {
    expect(Object.keys(m._)).toHaveLength(usersFavoriteSongsNumber);
});
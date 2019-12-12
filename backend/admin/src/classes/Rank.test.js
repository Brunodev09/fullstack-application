const Rank = require('./Rank');

let top = ["5ac98fas98sad79", "5bc98fas98sad79", "5bb98fas98sad79", "5tt98fas98sad79", "5zz98fas98sad79"];
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
        if (Math.floor(Math.random() * 10) % 2 === 0) l.push(top[i]);
        else l.push("RANDOM_ID");
    }
    return l;
}

for (let i = 0; i < 100; i++) {
    list.push({ name: makeName(Math.floor(Math.random() * 8)), songs: makeList() });
}


test('gives list of top5 songs and a list of users and expects a list of classified users', () => {
    expect(Rank.rank(list, top)).toHaveLength(list.length);
})
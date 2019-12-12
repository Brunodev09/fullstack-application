const Top = require('./Top');

let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c'];
let map = {};

function makeId() {
    let id = "";
    for (let i = 0; i < 9; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function makeQuantity() {
    return Math.floor(Math.random() * 100);
}

for (let i = 0; i < 100; i++) {
    map[makeId()] = makeQuantity();
}


test('Receives a map of songs and returns a list of the top 5 rated songs.', () => {
    expect(Top.pick(map)).toHaveLength(5);
});
class Top {
    static pick(map) {
        let top = [];
        while (top.length < 5) {
            let greater = 0;
            for (let key in map) {
                if (!map[greater]) greater = key;
                if (map[key] >= map[greater]) greater = key;
            }
            delete map[greater];
            top.push(greater);
        }
        return top;
    }
}

module.exports = Top;
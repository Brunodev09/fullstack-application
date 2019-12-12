class Top {
    static pick(map) {
        let top = [];

        while (top.length < 5) {
            let greater = 0;
            for (let key in map) {
                if (map[key] > greater) greater = key;
            }
            delete map[greater];
            top.push(greater);
        }
        return top;


    }
}

module.exports = Top;
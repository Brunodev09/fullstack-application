/**
 * Receives a map of songs indexed by their indexed by their id and valued by the amount of votes that each song
 * received from all the users collection. It does this by defining a while loop that won't exit until the length
 * of our top list does not equal five. Inside this while loop, we run a for-in loop to iterate through the keys
 * of our songs map and compare it with a variable "greater". (That is initialized as being the first key of the map)
 * We index the map with the current key in the for-in and also with the greater key value, if the value of the map
 * indexed by the current key is bigger or equal than the other, we associate greater to this key.
 * After this inner loop, it deletes from the map the property that was associated with the current greater variable.
 * It also re-initializes greater as zero after each completed while iteration.
 *
 * As we had no need to mantain any states inside the class, I made the method static, so we can share it through all
 * instances and it becomes a pure function without the need of the "this".
 *
 * @static
 * @param {map} map - Map of songs { [<string>songId]: <number>votes }.
 * @return {list} List array of top voted songs inside the map. [<string>songId]. Length = 5;
 */
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
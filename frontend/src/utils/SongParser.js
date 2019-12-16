/**
 * Class that receives the JSON songs array and returns it sorted and filtered only with the properties that we need. 
 * @param {array} JSONFile
 * @returns {null}
 */
export default class SongFileParser {
    constructor(JSONFile) {
        let _arr = [...JSONFile];
        this.parsed = [];
        _arr = _arr.map(k => {
            if (k.name && k.id) {
                return {
                    name: k.name.toString(),
                    id: k.id,
                    artist: k.artists,
                    genre: k.genre,
                    duration: k.duration_ms,
                    dance: k.danceability
                }
            }
        });
        _arr.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        this.parsed = _arr;
    }
}
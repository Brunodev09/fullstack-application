/**
 * Receives an array of object users from the users collection, and map the frequency of each song inside all the users.
 * A very common and efficient problem solving algorithm for frequency matching.
 *
 * I chose this solution for two reasons. As I did NOT needed to know any order from votes, there is no point in using
 * a list or array and also because representing each song primarily by their id, makes the backend services a lot
 * lighter, since the 5 song ID's of each user and their nickname will be provided by the frontend solution, we don't
 * need to parse the JSON on the backend AT ALL. All we need to do is map and return these id's to the
 * frontend interface. This seemed like the best solution to me because: The frontend NEEDS the names and other
 * information of each song to display it to users. So:
 *
 * 1-) Either I'd parse the JSON in the backend and return it to the frontend interface as chunks of data for every request.
 * 2-) Or I'd parse the JSON only once on the frontend interface and persist only an unique identifier for each user
 * and song (nickname and array of 5 favorite songs)
 *
 * Both solutions have their up and downside:
 * 1- DOWN) Makes the service requires more processing to parse and map JSON datas to each request.
 * 1- UP) Makes the data more secure and actually reliable.
 *
 * 2- DOWN) Makes the data to be processed in both services of this application open to frontend exploits. That means
 * some user can breakpoint the React interface to intercept the http request and send us crazy hash ids that will never
 * match the JSON data in the React interface, either (a) causing a crash in the screen after the return of the request
 * or (b) possibly manipulating the process final result. The problem (a) can be easily fixed with a simple map access
 * in the React application, but for (b) I couldn't think of a fix, but there is not much harm that can be done in this
 * specific service, since the Admin route process does not persist its data to the database, making each request unique.
 *
 * My decision:
 *
 * Not only this specific Admin service but also the Submit service would need to parse with every request,
 * chunks of JSON information, and considering that the Submit service needed to be scalable, I decided to remove this
 * backend flow altogether.
 *
 * @property {_}  map - An object literal to represent our hashMap data structure.
 * @property {users}  users - Users MongoDB object {name: <string>, songs: [<string>songId], _id: <MongoObject>}.
 * @return {null}
 */
class SongMapper {
    constructor(users) {
        this._ = {};
        this.users = users;
    }

    map() {
        if (!this.users || !this.users.length) return undefined;
        for (let user of this.users) {
            if (!user.songs || !user.songs.length) continue;
            for (let song of user.songs) {
                if (!this._[song]) this._[song] = 1;
                else this._[song]++;
            }
        }
    }
}

module.exports = SongMapper;
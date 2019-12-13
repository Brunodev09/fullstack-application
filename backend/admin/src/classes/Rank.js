const UserAbstraction = require("../abstract/user");

/**
 * Receives a list of user objects from the database and the top5 songs list, which is represented by each song id as a
 * string. Instatiates a new class that represents a user, but associates points to each of them, accordingly to the
 * number of matches in their (users) own songs array and the top5 songs array. As we had no need to mantain any states
 * inside the class, I made the method static, so we can share it through all instances and it becomes a pure function
 * without the need of the "this".
 *
 * @static
 * @param {users} users - Users MongoDB object {name: <string>, songs: [<string>songId], _id: <MongoObject>}.
 * @param {top} top - Top array [<string>songId]. Length = 5;
 * @return {list} List array of users with points added. [<newUser>]. Length = users.length;
 */

class Rank {
    static rank(users, top) {
        let list = [];
        for (let user of users) {
            if (!user.songs || !user.songs.length) continue;
            let userObj = new UserAbstraction(user.name, 0);
            for (let song of user.songs) {
                for (let id of top) {
                    if (song === id) userObj.points++;
                }
            }
            list.push(userObj);
        }
        return list;
    }
}

module.exports = Rank;
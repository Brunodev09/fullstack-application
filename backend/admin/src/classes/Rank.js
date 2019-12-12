const UserInterface = require("../abstract/user");

class Rank {
    static rank(users, top) {
        let list = [];
        for (let user of users) {
            if (!user.songs || !user.songs.length) continue;
            let userObj = new UserInterface(user.name, 0);
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
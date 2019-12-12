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
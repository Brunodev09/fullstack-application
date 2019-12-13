/**
 * Interface for classes that represents an user.
 *
 * @interface
 */
class User {
    constructor(nickname, points) {
        this.nickname = nickname;
        this.points = points;
    }
}

module.exports = User;
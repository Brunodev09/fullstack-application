/**
 * Interface for classes that represents an user.
 *
 * @interface
 */

// PS: Interfaces cannot be really done in vanilla Javascript. Because of this I ignored the main limitations
// of what an interface can and CANNOT do. For instance, it's trivial that the OOP concept of an interface cannot
// be instantiated, but there is no other way around Javascript without using an outer package or a Typescript compiler,
// so yes I'm instantiating an interface to represent a concept of User.

class User {
    constructor(nickname, points) {
        this.nickname = nickname;
        this.points = points;
    }
}

module.exports = User;
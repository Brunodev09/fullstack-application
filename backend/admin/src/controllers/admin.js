const express = require("express");

const logger = require("../tools/logger");
const CODES = require("../constants/status");
const User = require("../models/user");

const { INTERNAL_ERROR, SUCCESS, BAD } = CODES;


module.exports = class AdminController {

    constructor() {
        this.path = '/admin';
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.get(this.path, this.process);
    }

    process = async (req, res) => {
        try {
            let songMapper = {};
            let top5 = [];

            this.users = await User.find();

            if (!this.users || !this.users.length) return res.status(BAD).json({errors: 'There are no users on the database!'});

            for (let user of this.users) {
                if (!user.songs || !user.songs.length) continue;
                for (let song of user.songs) {
                    if (!songMapper[song.id]) songMapper[song.id] = 1;
                    else songMapper[song.id]++;
                }
            }

            while (top5.length < 5) {
                let greater = 0;
                for (let key in songMapper) {
                    if (songMapper[key] > greater) greater = key;
                }
                top5.push(greater);
            }

            for (let user of this.users) {
                if (!user.songs || !user.songs.length) continue;
                user.points = 0;
                for (let song of user.songs) {
                    for (let topSong of top5) {
                        if (song.id === topSong) user.points++;
                    }
                }
            }

            logger.info(JSON.stringify(top5, this.users));

            return res.status(SUCCESS).json({top5, users: this.users});

        } catch (e) {
            logger.error(e.message || e);
            res.status(INTERNAL_ERROR).send('Internal server error!');
        }
    };


};




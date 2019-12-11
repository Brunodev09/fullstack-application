const express = require("express");

const User = require("../models/user");
const logger = require("../tools/logger");
const CODES = require("../constants/status");
const mongoose = require("mongoose");

const { INTERNAL_ERROR, NOT_FOUND, SUCCESS, BAD } = CODES;


module.exports = class UserController {

    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.post(this.path, this.create);
        this.router.delete(`${this.path}/drop`, this.drop);
    }

    create = async (req, res) => {
        try {
            const {name, songs} = req.body;
            if (!name) return res.status(NOT_FOUND).json({error: "Missing nickname from request!"});
            if (!songs || !songs.length) return res.status(NOT_FOUND).json({error: "Missing song list from request!"});

            this.user = await User.findOne({name: name});

            if (this.user) return res.status(BAD).json({errors: 'Nickname already exists on the database!'});

            this.user = new User({name, songs});

            const query = await this.user.save();

            return res.status(SUCCESS).json({status: SUCCESS});

        } catch (e) {
            logger.error(e.message || e);
            res.status(INTERNAL_ERROR).send('Internal server error!');
        }
    };

    drop = async (req, res) => {
        try {
            let drop = await mongoose.connection.db.dropCollection('users');
            return res.status(SUCCESS).json({status: SUCCESS});

        } catch (e) {
            logger.error(e.message || e);
            res.status(INTERNAL_ERROR).send('Internal server error!');
        }
    };


};




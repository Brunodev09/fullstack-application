const express = require("express");

const User = require("../models/user");
const logger = require("../tools/logger");
const CODES = require("../constants/status");
const ERRORS = require("../constants/error");
const mongoose = require("mongoose");

const { INTERNAL_ERROR, NOT_FOUND, SUCCESS, BAD } = CODES;
const { MISSING_NICKNAME, MISSING_SONG_LIST, LIST_OVERFLOW, ALREADY_EXISTS, INTERNAL_SERVER_ERROR } = ERRORS;

// @TODO - Document the ENTIRE code explaining (tests included) what each function and classes does and why.
// @TODO - Don't forget a very detailed README (Microservices architecture and MVC pattern (Scalability of controllers)).
// @TODO - Also remember to quote that we're not only dockerizing the services but also clustering their ports.
// @TODO - Remember to note why I chose to map songs through ID, so I'd use less processing in the API's since the interfaces.
// will need to parse the JSON anyway to be able to display each name of the song. So we're parsing it only once. 
// @TODO - Jest all the classes and make a test to prove that we're DDoS free on this particular service.

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
            if (!name) {
                logger.error(MISSING_NICKNAME);
                return res.status(NOT_FOUND).json({error: MISSING_NICKNAME});
            }
            if (!songs || !songs.length) {
                logger.error(MISSING_SONG_LIST);
                return res.status(NOT_FOUND).json({error: MISSING_SONG_LIST});
            }
            if (songs.length > 5) {
                logger.error(LIST_OVERFLOW);
                return res.status(NOT_FOUND).json({error: LIST_OVERFLOW});
            }

            logger.warn(`Querying database for the user with the alias of ${name}...`);
            this.user = await User.findOne({name});
            logger.info("OK.");

            if (this.user) return res.status(BAD).json({errors: ALREADY_EXISTS});

            this.user = new User({name, songs});

            const query = await this.user.save();

            return res.status(SUCCESS).json({status: SUCCESS});

        } catch (e) {
            logger.error(e.message || e);
            logger.error(__filename);
            res.status(INTERNAL_ERROR).send(INTERNAL_SERVER_ERROR);
        }
    };

    drop = async (req, res) => {
        try {
            logger.warn("Administration feature only, dropping the entire USERS collection from database.");
            let drop = await mongoose.connection.db.dropCollection('users');
            logger.info("OK.");
            return res.status(SUCCESS).json({status: SUCCESS});

        } catch (e) {
            logger.error(e.message || e);
            logger.error(__filename);
            res.status(INTERNAL_ERROR).send(INTERNAL_SERVER_ERROR);
        }
    };
};




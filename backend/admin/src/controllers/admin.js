const express = require("express");

const logger = require("../tools/logger");
const CODES = require("../constants/status");
const ERRORS = require("../constants/error");
const User = require("../models/user");
const SongMapper = require("../classes/SongMapper");
const Top = require("../classes/Top");
const Rank = require("../classes/Rank");

const { INTERNAL_ERROR, SUCCESS, BAD } = CODES;
const { INTERNAL_SERVER_ERROR, NO_USER } = ERRORS;


/** AdminController is the class that handles the processing of users and votes. */
module.exports = class AdminController {
     /**
     * Instantiates routes primary path and Express Router.
     */
    constructor() {
        this.path = '/admin';
        this.router = express.Router();
        this.init();
    }

    /**
     * Instantiates the process route.
     */
    init() {
        this.router.get(this.path, this.process);
    }

    /**
     * Process the entire user collection, selects TOP5 list accordingly to frequency of votes. Also returns a user list regarding
     * contribution. Contribution points are earned by matching one or more songs that are associated with an user
     *  with one or more songs that are contained by the TOP5 list. 
     * Edge case for an empty query.
     * 
     * @async
     * @param {req} req - Express request object.
     * @param {res} res - Express response object.
     * @return {Promise<res>} Express response object.
     */
    process = async (req, res) => {
        try {
            const songTotal = 100;

            logger.warn("Querying database for all the users...this might take a while.");

            this.users = await User.find();

            logger.info("OK.");

            if (!this.users || !this.users.length) return res.status(BAD).json({errors: NO_USER});

            logger.info(`Mapping a total of ${this.users.length} users and ${this.users.length * 5} votes from ${songTotal} songs.`);
            let mapper = new SongMapper(this.users);
            mapper.map();
            mapper = mapper._;
            logger.info("OK.");

            logger.info(`Processing the TOP5...`);
            let top5 = Top.pick(mapper);
            logger.info("OK.");

            logger.info(`Grouping users and pontuations...`);
            let userList = Rank.rank(this.users, top5);
            logger.info("OK.");

            logger.info(`Returning request...`);
            return res.status(SUCCESS).json({top5, userList});

        } catch (e) {
            logger.error(e.message || e);
            logger.error(__filename);
            return res.status(INTERNAL_ERROR).send(INTERNAL_SERVER_ERROR);
        }
    };


};




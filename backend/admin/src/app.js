const cluster = require("cluster");
const express = require("express");
const mongoose = require("mongoose");
const {join} = require("path");
const logger = require("./tools/logger");
const cors = require("cors");


/** The Server class is responsible for initializing the Express framework, the Mongoose and MongoDB drivers, 
 * all the middlewares and all of the controllers as well. 
 * 
 * The MVC/MC pattern allows a pretty decent scalability of controllers with zero code on this class and a one liner
 * on the applications entry file (index.js). Also unifies MongoDB connections, making the use of models really quick
 * by discarding the necessity to establish a new connection at every import of each model. 
 * 
 * Also responsible for shutting the service down if anything goes wrong. 
 */

 
module.exports = class Server {
    /**
     * Instantiates express callbacks, database, middlewares and controllers.
     * @param controllers
     */
    constructor(controllers) {
        this.app = express();
        this.DB();
        this.initMiddlewares();
        this.initControllers(controllers);
    }
    /**
     * Listens in the desired port.
     *
     * @method
     * @listens {Request} Express http request.
     */    
    listen() {
        this.app.listen(process.env.PORT || 5001, () => logger.info(`Admin service has been started!`));
    }

    /**
     * Initializes middlewares: cors and body parsers.
     * @method
     */ 
    initMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    /**
     * Loop through and initializes all controllers of the application.
     * @method
     */ 
    initControllers(controllers) {
        for (let controller of controllers) {
            this.app.use("/", controller.router);
        }
    }

     /**
     * Standard initialization and connection of MongoDB with Mongoose and events listener for exceptions and messages.
     * @method
     * @listens {<http>MongoDB} http MongoDB object events
     */ 
    DB() {
        try {
            this.connection = mongoose.connect(process.env.MONGO_ACCESS, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            if (this.connection) logger.info("MongoDB is up and running...");
        } catch (e) {
            logger.error(`MongoDB ERROR: ${e}`);
            process.exit(1);
        }

        mongoose.connection.on("connected", () => {
            logger.info(`Mongoose connection event received!`);
        });

        mongoose.connection.on("error", err => {
            logger.error("Mongoose default connection error: " + err);
        });

        mongoose.connection.on("disconnected", () => {
            logger.info("Mongoose default connection disconnected");
        });

        process.on("SIGINT", () => {
            mongoose.connection.close(function () {
                logger.info(
                    "Mongoose default connection disconnected through app termination"
                );
                process.exit(0);
            });
        });
    }
};

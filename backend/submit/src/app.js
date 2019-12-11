const cluster = require("cluster");
const express = require("express");
const mongoose = require("mongoose");
const {join} = require("path");
const logger = require("./tools/logger");
const cors = require("cors");

module.exports = class Server {
    constructor(controllers) {
        this.app = express();
        this.DB();
        this.initMiddlewares();
        this.initControllers(controllers);

    }

    listen() {
        this.app.listen(process.env.PORT || 5000);
    }

    initMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    initControllers(controllers) {
        for (let controller of controllers) {
            this.app.use("/", controller.router);
        }
    }

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

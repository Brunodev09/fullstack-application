/** @author Bruno Mayol Giannotti - Fullstack application template. */

 const { resolve } = require("path");
const { config } = require("dotenv");
const cluster = require("cluster");
const logger = require("./tools/logger");

config({ path: resolve(__dirname, "../.env") });

/** Entry point of the application. Responsible for clustering our Express ports to deliver a highly scalable and available service.
 * Here we also import our main Server class and instantiate an object of it with objects of each controller as its paramaters.
 */

try {
    if (cluster.isMaster) {

        for (let i = 0; i < Number(process.env.CORES); i++) cluster.fork();

        cluster.on("exit", (deadWorker, code, signal) => {
            let worker = cluster.fork();

            logger.info(`Worker "${deadWorker.process.pid}" killed - Reason: ${signal} - Code: ${code}. Initializing new worker of PID "${worker.process.pid}"`);
        });

        return;
    }

    const Server = require("./app");
    const SubmitController = require("./controllers/submit");
    const server = new Server([new SubmitController()]);
    server.listen();

} catch (e) {
    logger.error(e.message || e);
    logger.error(__filename);
}
const { resolve } = require("path");
const { config } = require("dotenv");
const cluster = require("cluster");
const logger = require("./tools/logger");

config({ path: resolve(__dirname, "../.env") });

try {
    if (cluster.isMaster) {

        for (let i = 0; i < Number(process.env.CORES); i++) cluster.fork();

        cluster.on("exit", (deadWorker, code, signal) => {
            let worker = cluster.fork();

            logger.info(`Worker "${deadWorker.process.pid}" encerrado - Motivo: ${signal} - Código: ${code}. Inicializando novo worker de PID "${worker.process.pid}"`);
        });

        return;
    }

    const Server = require("./app");
    const SubmitController = require("./controllers/submit");
    const server = new Server([new SubmitController()]);
    server.listen();

} catch (e) {
    logger.error(e.message || e);
}
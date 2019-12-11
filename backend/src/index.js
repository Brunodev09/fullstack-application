const { resolve } = require("path");
const { config } = require("dotenv");
config({ path: resolve(__dirname, "../.env") });

const Server = require("./app");
// const UserController = require("./controllers/user");
const server = new Server([]);
server.listen();
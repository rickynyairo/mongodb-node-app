import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services/routes";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import config from "./config";
import { validateEnv } from "./utils/validateEnv";
process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

const app = express();

validateEnv();

applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);

const PORT  = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);
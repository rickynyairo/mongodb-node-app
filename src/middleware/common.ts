import { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import expressSession from "express-session";
import config from "../config";
import passport from "passport";
// const CassandraStore = require("cassandra-store");

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const loggerMiddleware = (router: Router) => {
  router.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(req.method, ": ", req.path);
    next();
  });
};

export const passportMiddleware = (router: Router) => {
  router.use(passport.initialize());
  router.use(passport.session());
};

export const sessionMiddleware = (router: Router) => {
  const userOptions = {
    table: "sessions",
    client: undefined,
    clientOptions: {
      contactPoints: ["localhost"],
      keyspace: "tests",
      queryOptions: {
        prepare: true
      }
    }
  };
  router.use(expressSession({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // store: new CassandraStore(userOptions)
  }));
};
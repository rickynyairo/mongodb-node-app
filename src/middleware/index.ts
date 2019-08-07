import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  loggerMiddleware,
  sessionMiddleware,
  passportMiddleware
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
  loggerMiddleware,
  sessionMiddleware,
  passportMiddleware
];

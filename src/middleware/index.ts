import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  loggerMiddleware,
  sessionMiddleware
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
  loggerMiddleware,
  sessionMiddleware
];
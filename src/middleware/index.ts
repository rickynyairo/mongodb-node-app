import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  loggerMiddleware
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
  loggerMiddleware
];
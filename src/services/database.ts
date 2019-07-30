import { connect } from "mongoose";
import config from "../config";

export default () => connect(`${config.MONGO_DB_URL}`);
import { connect } from "mongoose";
import config from "../config";

export const dbConn = () => connect(`${config.MONGO_DB_URL}`, { useNewUrlParser: true });
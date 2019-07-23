import dotenv from "dotenv";

dotenv.config();

const {
  env: {
    PORT,
    NODE_ENV,
    MONGO_DB_URL
  },
} = process;

export default Object.freeze({
  PORT,
  NODE_ENV,
  MONGO_DB_URL
});

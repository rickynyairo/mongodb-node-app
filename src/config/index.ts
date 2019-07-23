import dotenv from "dotenv";

dotenv.config();

const {
  env: {
    PORT,
    NODE_ENV
  },
} = process;

export default Object.freeze({
  PORT,
  NODE_ENV
});

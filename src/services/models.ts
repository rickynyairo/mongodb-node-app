import { model, Schema, Document } from "mongoose";
import { Post, User } from "../controllers/interfaces";

const postSchema = new Schema({
  author: String,
  content: String,
  title: String,
});

export const postModel = model<Post & Document>("Post", postSchema);

const userSchema = new Schema({
  userName: String,
  password: String,
});

export const userModel = model<User & Document>("User", userSchema);
import { Request, Response, NextFunction } from "express";
import { PostValidator, validateRequest, ModifyPostValidator } from "../utils/validators";
import { dbConn } from "../services/database";
import { postModel } from "../services/models";
import { Post } from "./interfaces";
export default class PostController {
  posts!: any;
  constructor() {
    this.posts = postModel;
    this.connectToDatabase();
  }

  private connectToDatabase() {
    return dbConn();
  }

  getAllPosts = async (_request: Request, response: Response) => {

    const posts = await this.posts.find().exec();
    return response.status(200).send(posts);
  }

  getPostById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const post = await this.posts.findById(id).exec();
    return response.status(200).send(post);
  }

  modifyPost = async (request: Request, response: Response) => {
    const validationErrors = await validateRequest(ModifyPostValidator, request.body);
    if (validationErrors) {
      return response.status(400).send(validationErrors);
    }
    const { id } = request.params;
    const postData: Post = request.body;
    this.posts.findByIdAndUpdate(id, postData, { new: true })
      .then((post: any) =>
        response.send(post)
      );
  }

  createAPost = async (request: Request, response: Response) => {
    const validationErrors = await validateRequest(PostValidator, request.body);
    if (validationErrors) {
      return response.status(400).send(validationErrors);
    }
    const post: Post = request.body;
    const createdPost = new postModel(post);
    const savedPost = await createdPost.save();
    return response.status(201).send(savedPost);
  }

  deletePost = (request: Request, response: Response) => {
    const { id } = request.params;
    this.posts.findByIdAndDelete(id)
      .then((successResponse: any) => {
        return successResponse
          ? response.send(200)
          : response.send(404);
      });
  }
}

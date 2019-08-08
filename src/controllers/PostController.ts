import { Request, Response } from "express";
import { postModel } from "../models/postModel";
import { Post } from "./interfaces";
export default class PostController {
  posts!: any;
  constructor() {
    this.posts = postModel;
  }

  getAllPosts = async (_request: Request, response: Response) => {
    const posts = await this.posts
      .find()
      .populate("author", "userName")
      .exec();
    return response.status(200).send(posts);
  };

  getPostById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const post = await this.posts.findById(id).exec();
    return response.status(200).send(post);
  };

  modifyPost = async (request: Request, response: Response) => {
    const { id } = request.params;
    const postData: Post = request.body;
    this.posts
      .findByIdAndUpdate(id, postData, { new: true })
      .then((post: any) => response.send(post));
  };

  createAPost = async (request: Request, response: Response) => {
    const post: Post = request.body;
    const createdPost = new postModel({
      ...post,
      author: request.user._id
    });
    const savedPost = await createdPost.save();
    await savedPost.populate("author", "userName").execPopulate();
    return response.status(201).send(savedPost);
  };

  deletePost = (request: Request, response: Response) => {
    const { id } = request.params;
    this.posts.findByIdAndDelete(id).then((successResponse: any) => {
      return successResponse ? response.send(200) : response.send(404);
    });
  };
}

import { Request, Response, NextFunction } from "express";
import { PostValidator, validateRequest } from "../utils/validators";
import dbConn from "../services/database";
import postModel from "../services/models"
import { Post } from "./interfaces";
export default class PostController {

  constructor(){
    this.connectToDatabase();
  }

  private connectToDatabase(){
    return dbConn();
  }
  
  getAllPosts = async (_request: Request, response: Response) => {
    const posts = await postModel.find().exec();
    return response.status(200).send(posts);
  }

  getPostById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const post = await postModel.findById(id).exec();
    return response.status(200).send(post);
  }

  createAPost = async (request: Request, response: Response) => {
    const validationErrors = await validateRequest(PostValidator, request.body);
    if (validationErrors) {
      return response.status(400).send(validationErrors);
    }
    const createdPost = new postModel(request.body);
    const savedPost = await createdPost.save();
    return response.status(201).send(savedPost);
  }

  deletePost = async (request: Request, response: Response) => {
    const { id } = request.params;
    const post = await postModel.findByIdAndDelete(id).exec();
    return response.status(200).send(post);
  }
}

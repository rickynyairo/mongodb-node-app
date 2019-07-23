import { Request, Response, NextFunction } from "express";
import { PostValidator, validateRequest } from "../utils/validators";
// import { readFileSync, writeFile } from "fs";
import { Post } from "./interfaces";
export default class PostController {
  private posts: Post[] = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
    {
      author: "Virginia",
      content: "Super Feminism",
      title: "A Room of Ones own",
    },
  ];
  getAllPosts = (request: Request, response: Response): Response => {
    return response.send(this.posts);
  }

  createAPost = async (request: Request, response: Response) => {
    const validationErrors = await validateRequest(PostValidator, request.body);
    if (validationErrors) {
      return response.status(400).send(validationErrors);
    }
    const post: Post = request.body;
    this.posts.push(post);
    return response.send(post);
  }
}

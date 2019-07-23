import { Request, Response } from "express";
import PostController from "../controllers/PostController";

const { getAllPosts, createAPost } = new PostController();

export default [
  {
    path: "/",
    method: "get",
    handler: async (_req: Request, res: Response) => {
      // redirect user to the api docs
      res.redirect("/api-docs");
    }
  },
  {
    path: "/api/posts",
    method: "get",
    handler: getAllPosts
  },
  {
    path: "/api/posts",
    method: "post",
    handler: createAPost
  },
];
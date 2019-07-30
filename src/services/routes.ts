import { Request, Response } from "express";
import PostController from "../controllers/PostController";

const { 
  getAllPosts, 
  createAPost, 
  getPostById,
  deletePost
 } = new PostController();

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
  {
    path: "/api/posts/:id",
    method: "get",
    handler: getPostById
  },
  {
    path: "/api/posts/:id",
    method: "delete",
    handler: deletePost
  },
];
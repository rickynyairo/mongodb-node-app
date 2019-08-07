import { Request, Response } from "express";
import passport from "passport";
import PostController from "../controllers/postController";
import UserController from "../controllers/userController";
import {
  UserValidator,
  PostValidator,
  ModifyPostValidator
} from "../utils/validators";
import { validationMiddleware } from "../middleware/common";

const {
  getAllPosts,
  createAPost,
  getPostById,
  deletePost,
  modifyPost
} = new PostController();

const { registerUser, loginUser } = new UserController();

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
    handler: [
      passport.authenticate("JWT", { session: false }, (error, data) => {
        console.log("error......>\n", error, "data......>\n", data);
      }),
      validationMiddleware(PostValidator),
      createAPost
    ]
  },
  {
    path: "/api/posts/:id",
    method: "get",
    handler: getPostById
  },
  {
    path: "/api/posts/:id",
    method: "delete",
    handler: [passport.authenticate("jwt", { session: false }), deletePost]
  },
  {
    path: "/api/posts/:id",
    method: "put",
    handler: [
      passport.authenticate("jwt", { session: false }),
      validationMiddleware(ModifyPostValidator),
      modifyPost
    ]
  },
  {
    path: "/api/signup",
    method: "post",
    handler: [validationMiddleware(UserValidator), registerUser]
  },
  {
    path: "/api/login",
    method: "post",
    handler: [
      validationMiddleware(UserValidator),
      passport.authenticate("local"),
      loginUser
    ]
  }
];

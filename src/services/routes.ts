import { Request, Response } from "express";
import { Controller } from "../controllers/SampleController";

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
    path: "/api/path",
    method: "post",
    handler: Controller.sampleController
  },
];
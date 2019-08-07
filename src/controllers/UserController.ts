import { Request, Response } from "express";
import { Document } from "mongoose";
import { userModel, createUser, generateJWT } from "../models/userModel";
import { User } from "./interfaces";
export default class UserController {
  users!: any;
  constructor() {
    this.users = userModel;
  }

  loginUser = async (request: Request, response: Response) => {
    const { userName, id } = request.user;
    const token = generateJWT(request.user);
    return response
      .status(200)
      .send({ message: "success", userName, id, token });
  };

  registerUser = async (request: Request, response: Response) => {
    const newUser: User & Document = new userModel(request.body);
    if (await userModel.findOne({ userName: newUser.userName })) {
      return response
        .status(400)
        .send({ message: "A user with that username exists" });
    }
    await createUser(newUser, (error: any, savedUser: any) => {
      if (error) throw error;
      const token = generateJWT(request.body);
      return response
        .status(201)
        .send({ ...request.body, token })
        .end();
    });
  };
}

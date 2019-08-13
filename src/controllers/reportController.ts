import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel";

export default class ReportController {
  user!: any;
  constructor() {
    this.user = userModel;
  }
  generateReport = async (
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const usersByCities = await this.user.aggregate([
      {
        $match: {
          "address.city": {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            city: "$address.city"
          },
          users: {
            $push: {
              userName: "$userName",
              _id: "$_id"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {
          from: "posts",
          localField: "users._id",
          foreignField: "author",
          as: "articles",
        }
      }
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'users._id',
      //     foreignField: '_id',
      //     as: 'users',
      //   }
      // }
    ]);
    return response.send({
      usersByCities
    });
  };
}

import { Request, Response, NextFunction } from "express";
import { GenerateNumbersValidator, validateRequest } from "../utils/validators";
import { readFileSync, writeFile } from "fs";

export class Controller {
  /**
  * @description Generates a list of random phone numbers
  * @param {number} num The number of phone numbers to be generated
  * @returns {object} the object contains a list of the generated
  * numbers and the date they were generated
  */
  static async sampleController(req: Request, res: Response) {
    // const validationErrors = await validateRequest(
    //   GenerateNumbersValidator,
    //   req.body
    // );
    // if (validationErrors) {
    //   return res.status(400).send(validationErrors);
    // }

    return res.status(200).send({ done: "success" });
  }
}

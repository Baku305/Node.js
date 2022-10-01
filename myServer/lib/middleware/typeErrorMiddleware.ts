import { coffeeSchema } from "../validation/coffeeValidation";
import { ErrorRequestHandler } from "express";
import {z} from 'zod'
import { Request, Response, NextFunction } from "express";


export const typeValidationMiddleWare  = (
 req : Request,
 res : Response,
 next : NextFunction
) => {

 coffeeSchema.parse(req.body)

};

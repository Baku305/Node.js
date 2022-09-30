import { coffeeSchema } from "../validation/coffeeValidation";
import { ErrorRequestHandler } from "express";
import {z} from 'zod'


export const typeErrorMiddleWare : ErrorRequestHandler = (
 error,
 request,
 response,
 next
) => {
 try {

 coffeeSchema.parse(request.body)

 } catch (error) {

 if (error instanceof z.ZodError) {
  response.status(400).send({
   errors: error.issues,
  });
  next();
 } else {
  next(error);
 }
 }
};

import { ErrorRequestHandler } from "express";
import { z } from "zod";
import { coffeeSchema } from "../validation/coffeeValidation";


export const validationErrorMiddleware : ErrorRequestHandler = (error,
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
}

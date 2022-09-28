import { ErrorRequestHandler } from "express";
import { z } from "zod";


export const validationErrorMiddleware : ErrorRequestHandler = (error,
 request,
 response,
 next
) => {

 if (error instanceof z.ZodError) {
  response.status(422).send({
   errors: error.issues,
  });
  next();
 } else {
  next(error);
 }
}

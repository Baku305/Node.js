
import { z } from "zod"
import { ErrorRequestHandler } from "express";


export const coffeeSchema = z.object({
 name : z.string(),
 description: z.string().optional(),
 origin: z.string(),
 type: z.string(),
}).strict()

export type coffeeData = z.infer<typeof coffeeSchema>

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


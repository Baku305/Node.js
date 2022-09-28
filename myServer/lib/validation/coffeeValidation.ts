
import { z } from "zod"

export const coffeeSchema = z.object({
 name : z.string(),
 description: z.string().optional(),
 origin: z.string(),
 type: z.string(),
}).strict()

export type coffeeData = z.infer<typeof coffeeSchema>



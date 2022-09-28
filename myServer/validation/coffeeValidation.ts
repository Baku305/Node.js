import { z } from "zod"

const coffeeSchema = z.object({
 name : z.string(),
 description: z.string().optional(),
 origin: z.string(),
 type: z.string(),
})

export type coffeeData = z.infer<typeof coffeeSchema>


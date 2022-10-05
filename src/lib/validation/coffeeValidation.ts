
import { number, object, z } from "zod"

export const coffeeSchema = z.object({
 name : z.string().min(1),
 description: z.string().optional(),
 origin: z.string().min(1),
 type: z.string().min(1),
}).strict()

export type coffeeData = z.infer<typeof coffeeSchema>


export const getOneCoffeSchema = z.object({
 body:object({
  params: object({
   id: number()
  })
 })
})

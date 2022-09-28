import prisma from "./prisma/client";
import express from "express"
import "express-async-errors"
import { coffeeData, coffeeSchema } from "./validation/coffeeValidation";

export const app = express()

app.use(express.json())

app.get("/coffee",async  (request,response) => {


 const coffee = await prisma.coffee.findMany()

 response.json(coffee)

})

app.post(
 "/coffee",
 async (request, response) => {

   const coffeeData : coffeeData = request.body;
   const parsedCoffee = coffeeSchema.parse(coffeeData)
   const coffee = await prisma.coffee.create({
    data: parsedCoffee,
   })


   response.status(201).json(coffee);

 }
);


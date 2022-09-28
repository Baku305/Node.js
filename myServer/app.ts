import prisma from "./prisma/client";;
import express from "express";
import "express-async-errors";
import { coffeeData, coffeeSchema, validationErrorMiddleware } from "./validation/coffeeValidation";
import cors from "cors"

export const app = express()

const corsOptions = {
 origin: "http://localhost:8080"
}

app.use(express.json())

app.use(cors("http://localhost:8080"))



app.get("/coffee",async  (request,response) => {


 const coffee = await prisma.coffee.findMany()

 response.json(coffee)

})

app.get("/coffee/:id(\\d+)", async (request, response, next) => {

 const coffeId = Number(request.params.id);

 const coffee = await prisma.coffee.findUnique({
  where: { id: coffeId },
 });

 if (!coffee) {
  response.status(404);
  return next(`Cannot GET /coffee/${coffeId}`);
 }

 response.json(coffee);
});

app.post(
 "/coffee",
 async (request, response, next) => {

   const coffeeData : coffeeData = request.body;
   const parsedCoffee = coffeeSchema.parse(coffeeData)
   const coffee = await prisma.coffee.create({
    data: parsedCoffee,
   })


   response.status(201).json(coffee);

 }
);

app.delete("/coffee/:id(\\d+)", async (request, response, next) => {
 const planetID = Number(request.params.id);

 try {
  await prisma.coffee.delete({
   where: { id: planetID },
  });

  response.status(204).end();
 } catch (error) {
  response.status(404);
  next(`Cannot Delete /coffee/${planetID}`);
 }
});

app.put(
 "/coffee/:id(\\d+)",
 async (request, response, next) => {
  const coffeeData: coffeeData = request.body;
  const parsedCoffee = coffeeSchema.parse(coffeeData)
  const planetID = Number(request.params.id);

  try {
   const coffee = await prisma.coffee.update({
    where: { id: planetID },
    data: parsedCoffee,
   });

   response.status(200).json(coffee);
  } catch (error) {
   response.status(404);
   next(`Cannot PUT /coffee/${planetID}`);
  }
 }
);

app.use(validationErrorMiddleware);

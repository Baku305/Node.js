import prisma from "./lib/prisma/client";
import express from "express";
import "express-async-errors";
import {
 coffeeData,
 coffeeSchema,
 validationErrorMiddleware,
} from "./lib/validation/coffeeValidation";
import cors from "cors";

import { initMulterMiddleware } from "./lib/middleware/multer";

export const app = express();

const upload = initMulterMiddleware();

const corsOptions = {
 origin: "http://localhost:8080",
};

app.use(express.json());

app.use(cors(corsOptions));

app.get("/coffee", async (request, response) => {
 const coffee = await prisma.coffee.findMany();

 response.json(coffee);
});

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

app.post("/coffee", async (request, response, next) => {
 const coffeeData: coffeeData = request.body;
 const parsedCoffee = coffeeSchema.parse(coffeeData);
 const coffee = await prisma.coffee.create({
  data: parsedCoffee,
 });

 response.status(201).json(coffee);
});

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

app.put("/coffee/:id(\\d+)", async (request, response, next) => {
 const coffeeData: coffeeData = request.body;
 const parsedCoffee = coffeeSchema.parse(coffeeData);
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
});

app.post(
 "/coffee/:id(\\d+)/photo",
 upload.single("photo"),
 async (request, response, next) => {
  console.log("request.file", request.file)

  if (!request.file) {
   response.status(400);
   return next("No photo file uploaded.")
  }

  const photoFileName = request.file.filename;

  response.status(201).json({photoFileName})
 }
);

app.use(validationErrorMiddleware);

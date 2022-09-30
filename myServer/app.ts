
import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./lib/routes/routes";
import { initMulterMiddleware } from "./lib/middleware/multer";
import { validationErrorMiddleware } from "./lib/middleware/validationErrorMiddleware";

export const app = express();

app.use(express.json());

const corsOptions = {
 origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

const upload = initMulterMiddleware()

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

app.use("/coffee", router);
app.use(validationErrorMiddleware);

// app.get("/coffee", async (request, response) => {

//  const coffee = await prisma.coffee.findMany();

//  response.json(coffee);
// });

// app.get("/coffee/:id(\\d+)", async (request, response, next) => {
//  const coffeId = Number(request.params.id);

//  const coffee = await prisma.coffee.findUnique({
//   where: { id: coffeId },
//  });

//  if (!coffee) {
//   response.status(404);
//   return next(`Cannot GET /coffee/${coffeId}`);
//  }

//  response.json(coffee);
// });

// app.post("/coffee", async (request, response, next) => {
//  const coffeeData: coffeeData = request.body;
//  //coffeeSchema.parse(coffeeData);
//  const coffee = await prisma.coffee.create({
//   data: coffeeData,
//  });

//  response.status(201).json(coffee);
// });

// app.delete("/coffee/:id(\\d+)", async (request, response, next) => {
//  const planetID = Number(request.params.id);

//  try {
//   await prisma.coffee.delete({
//    where: { id: planetID },
//   });

//   response.status(204).end();
//  } catch (error) {
//   response.status(404);
//   next(`Cannot Delete /coffee/${planetID}`);
//  }
// });

// app.put("/coffee/:id(\\d+)", async (request, response, next) => {
//  const coffeeData: coffeeData = request.body;
//  const parsedCoffee = coffeeSchema.parse(coffeeData);
//  const planetID = Number(request.params.id);

//  try {
//   const coffee = await prisma.coffee.update({
//    where: { id: planetID },
//    data: parsedCoffee,
//   });

//   response.status(200).json(coffee);
//  } catch (error) {
//   response.status(404);
//   next(`Cannot PUT /coffee/${planetID}`);
//  }
// });


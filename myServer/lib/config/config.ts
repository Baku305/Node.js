import prisma from "../prisma/client";
import { Request, Response, NextFunction } from "express";

import { coffeeSchema } from "../validation/coffeeValidation";
import { initMulterMiddleware } from "../middleware/multer";


export const getAllCoffee = async (req: Request, res: Response) => {

 const coffee = await prisma.coffee.findMany();

 res.json(coffee);
};

export const getCoffeeById = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const coffeId = Number(req.params.id);

 const coffee = await prisma.coffee.findUnique({
  where: { id: coffeId },
 });

 if (!coffee) {
  res.status(404);
  return next(`Cannot get /coffee/${coffeId}`);
 }

 res.json(coffee);
};

export const createCoffee = async (req: Request, res: Response) => {
 coffeeSchema.parse(req.body)
 const coffee = await prisma.coffee.create({
  data: req.body,
 });

 res.status(201).json(coffee);
};

export const deleteCoffee = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const planetID = Number(req.params.id);

 try {
  await prisma.coffee.delete({
   where: { id: planetID },
  });
  res.status(204).end();
 } catch (error) {
  res.status(404);
  next(`Cannot delete /coffee/${planetID}`);
 }
};

export const updateCoffee = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 coffeeSchema.parse(req.body)
 try {
  await prisma.coffee.update({
   where: { id: Number(req.params.id) },
   data: req.body,
  });
  res.status(200).json(req.body);
 } catch (error) {
  res.status(404);
  return next("coffee does not exist");
 }
};

export const uploadPhoto = async ( req : Request, res : Response, next : NextFunction) => {

 console.log("request.file", req.file)

 if(!req.file){
  res.status(400);
  return next("no photo file uploaded")
 }

 const photoFileName = req.file.filename;

 res.status(201).json({photoFileName})
}

import express from "express";
import {
 createCoffee,
 deleteCoffee,
 getAllCoffee,
 getCoffeeById,
 updateCoffee,
 uploadPhoto,
} from "../controller/coffeeController";
import { checkAuthorization } from "../middleware/passport";
import { initMulterMiddleware } from "../middleware/multer";
import { typeValidationMiddleWare } from "../middleware/typeErrorMiddleware";

const coffeRouter = express.Router();
const upload = initMulterMiddleware()


coffeRouter.get("/", getAllCoffee);
coffeRouter.get("/:id(\\d+)", getCoffeeById);
coffeRouter.post("/",checkAuthorization,typeValidationMiddleWare, createCoffee);
coffeRouter.delete("/:id(\\d+)",checkAuthorization, deleteCoffee);
coffeRouter.put("/:id(\\d+)",checkAuthorization,typeValidationMiddleWare, updateCoffee);
coffeRouter.post("/:id(\\d+)/photo",checkAuthorization, upload.single("photo"),uploadPhoto);

export default coffeRouter;

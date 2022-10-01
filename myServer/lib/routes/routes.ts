import express from "express";
import {
 createCoffee,
 deleteCoffee,
 getAllCoffee,
 getCoffeeById,
 updateCoffee,
 uploadPhoto,
} from "../controller/controller";
import { initMulterMiddleware } from "../middleware/multer";
import { typeValidationMiddleWare } from "../middleware/typeErrorMiddleware";

const router = express.Router();
const upload = initMulterMiddleware()


router.get("/", getAllCoffee);
router.get("/:id(\\d+)", getCoffeeById);
router.post("/",typeValidationMiddleWare, createCoffee);
router.delete("/:id(\\d+)", deleteCoffee);
router.put("/:id(\\d+)",typeValidationMiddleWare, updateCoffee);
router.post("/:id(\\d+)/photo", upload.single("photo"),uploadPhoto);

export default router;

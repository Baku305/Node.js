import express from "express";
import {
 createCoffee,
 deleteCoffee,
 getAllCoffee,
 getCoffeeById,
 updateCoffee,
 uploadPhoto,
} from "../config/config";
import { initMulterMiddleware } from "../middleware/multer";

const router = express.Router();

router.get("/", getAllCoffee);
router.get("/:id(\\d+)", getCoffeeById);
router.post("/", createCoffee);
router.delete("/:id(\\d+)", deleteCoffee);
router.put("/:id(\\d+)", updateCoffee);

export default router;

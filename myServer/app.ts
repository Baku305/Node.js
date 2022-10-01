
import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./lib/routes/routes";
import { validationErrorMiddleware } from "./lib/middleware/validationErrorMiddleware";
import { initCorsMiddleware } from "./lib/middleware/cors";


export const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/coffee", router);
app.use("/coffee/photos", express.static("uploads"));
app.use(validationErrorMiddleware);



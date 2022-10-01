
import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./lib/routes/routes";
import { validationErrorMiddleware } from "./lib/middleware/validationErrorMiddleware";


export const app = express();

app.use(express.json());

const corsOptions = {
 origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use("/coffee", router);
app.use(validationErrorMiddleware);



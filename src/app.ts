
import express from "express";
import "express-async-errors";
import coffeeRouter from "./lib/routes/coffeeRoutes";
import authRouter from "./lib/routes/authRoutes";
import { validationErrorMiddleware } from "./lib/middleware/validationErrorMiddleware";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport"



export const app = express();

app.use(initSessionMiddleware())

app.use(passport.initialize())

app.use(passport.session())

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/coffee", coffeeRouter);

app.use("/auth", authRouter)

app.use("/coffee/photos", express.static("uploads"));

app.use(validationErrorMiddleware);



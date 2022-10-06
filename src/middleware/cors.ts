import cors from "cors";

export const initCorsMiddleware = () => {

 const corsOptions = {
  origin: "http://localhost:8080",
  credentials:true,
 };

 return cors(corsOptions)
}

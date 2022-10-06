import session from "express-session";

import config from "../config/config";

export const initSessionMiddleware = () => {
 return session({
  secret:config.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
 })
}

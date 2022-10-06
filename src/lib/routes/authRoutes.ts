import { Router } from "express";
import { githubCallbackHandler, loginHandler, logoutHandler } from "../controller/authController";
import { passport } from "../middleware/passport";

const authRouter = Router();

authRouter.get("/login", loginHandler);

authRouter.get(
 "/github/login",
 passport.authenticate("github", {
  scope: ["user:email"],
 })
);

authRouter.get(
 "/github/callback",
 //@ts-ignore
 passport.authenticate("github", {
  failureRedirect: "/auth/github/login",
  keepSessionInfo: true,
 })
,
 githubCallbackHandler)

authRouter.get("/logout", logoutHandler)

export default authRouter;

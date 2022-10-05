import { Request, Response, NextFunction, Router } from "express";
import { passport } from "../middleware/passport";

const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response, next: NextFunction) => {
 if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
  res.status(400);
  return next("Missing redirectTo query string parameter");
 }

 req.session.redirectTo = req.query.redirectTo;

 res.redirect("/auth/github/login");
});

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
 (req: Request, res: Response) => {
  if (typeof req.session.redirectTo !== "string") {
   return res.status(500).end();
  }
  res.redirect(req.session.redirectTo);
 })

authRouter.get("/logout", (req:Request,res:Response,next:NextFunction)=>{
 if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
  res.status(400);
  return next("Missing redirectTo query string parameter");
 }

 const redirectUrl = req.query.redirectTo;

 req.logout((error)=>{
  if (error) {
   return next(error)
  }
  res.redirect(redirectUrl)
 })
})

export default authRouter;

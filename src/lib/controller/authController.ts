import { Request, Response, NextFunction } from "express";


export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
 if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
  res.status(400);
  return next("Missing redirectTo query string parameter");
 }

 req.session.redirectTo = req.query.redirectTo;

 res.redirect("/auth/github/login");
}

export const githubCallbackHandler = async (req: Request, res: Response) => {
 if (typeof req.session.redirectTo !== "string") {
  return res.status(500).end();
 }
 res.redirect(req.session.redirectTo);
}

export const logoutHandler = async (req:Request,res:Response,next:NextFunction)=>{
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
}

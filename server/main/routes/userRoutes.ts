import { Request, Response, NextFunction, Router } from "express";
import signup from "../auth/signup";
import login from "../auth/login";
import logout from "../auth/logout";


const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout);


export default userRouter;
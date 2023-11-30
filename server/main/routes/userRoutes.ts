import { Request, Response, NextFunction, Router } from "express";
import { URequest,UResponse } from "../types";
import signup from "../auth/signup";
import login from "../auth/login";
import logout from "../auth/logout";
import authenticateUser from "../auth/authHelpers/auth";
import { getUser } from "../admin/user";
import authenticateAdmin from "../auth/authHelpers/admin";
const userRouter = Router();


//authentication primary routes
userRouter.post("/user/signup/", signup);
userRouter.post("/user/login/",login);
userRouter.get("/user/logout/", logout);

// profiles related user routes
// normal
userRouter.get("user/me", getUser);

//admin route
userRouter.get("user/profile/:id",[authenticateAdmin], getUser);

export default userRouter;
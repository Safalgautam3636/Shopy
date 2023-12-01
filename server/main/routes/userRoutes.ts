import { Router } from "express";
import signup from "../auth/signup";
import login from "../auth/login";
import logout from "../auth/logout";
import authenticateAdmin from "../auth/authHelpers/admin";
import { getUser,getUsers,deleteUser,deleteUsers,updateUser} from "../admin/user"

const userRouter = Router();


//authentication primary routes
userRouter.post("/user/signup/", signup);
userRouter.post("/user/login/",login);
userRouter.get("/user/logout/", logout);

// profiles related user routes
// normal
// userRouter.get("user/me", getUser);

//admin route
// userRouter.get("user/profile/:id",[authenticateAdmin], getUser);

userRouter.get('/admin/users', getUsers);
userRouter.get("/admin/user",getUser)

export default userRouter;
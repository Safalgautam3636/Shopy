import { Router } from "express";
import signup from "../auth/signup";
import login from "../auth/login";
import logout from "../auth/logout";
import authenticateAdmin from "../auth/authHelpers/admin";
import { getUser,getUsers,deleteUser,deleteUsers,updateUser} from "../admin/user"
import getOwnUserProfile from "../users/getOwnUserProfile";
import updateOwnUserProfile from "../users/updateUserProfile";
import authenticateUser from "../auth/authHelpers/auth";

const userRouter = Router();


//authentication primary routes
//signup
userRouter.post("/user/signup/", signup);
userRouter.post("/user/login/",login);
userRouter.get("/user/logout/", logout);
userRouter.get("/user/me/",authenticateUser, getOwnUserProfile);
userRouter.put("/user/update/", authenticateUser, updateOwnUserProfile);

//admin
userRouter.get('/admin/users',[authenticateUser,authenticateAdmin], getUsers);
userRouter.get("/admin/user/:id", [authenticateUser, authenticateAdmin], getUser);
userRouter.delete("/admin/user/delete-all/", [authenticateUser, authenticateAdmin], deleteUsers);
userRouter.delete("/admin/user/delete/:id", [authenticateUser, authenticateAdmin], deleteUser);
userRouter.put("/admin/user/update/:id", [authenticateUser, authenticateAdmin], updateUser);


export default userRouter;
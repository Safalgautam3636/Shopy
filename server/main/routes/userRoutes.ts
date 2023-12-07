import { Router } from "express";
import signup from "../auth/signup";
import login from "../auth/login";
import logout from "../auth/logout";
import authenticateAdmin from "../auth/authHelpers/admin";
import {
  getUser,
  getUsers,
  deleteUser,
  deleteUsers,
  updateUser,
} from "../admin/user";
import getOwnUserProfile from "../users/getOwnUserProfile";
import updateOwnUserProfile from "../users/updateUserProfile";
import authenticateUser from "../auth/authHelpers/auth";

const userRouter = Router();

// Normal user routes

/**
 * @route POST /user/signup
 * @description Create a new user account.
 * @param {User} body - User data for signup.
 * @returns {object} - Signup result.
 */
userRouter.post("/user/signup/", signup);

/**
 * @route POST /user/login
 * @description User login.
 * @param {User} body - User credentials for login.
 * @returns {object} - Login result.
 */
userRouter.post("/user/login/", login);

/**
 * @route GET /user/logout
 * @description User logout.
 * @returns {object} - Logout result.
 */
userRouter.get("/user/logout/", logout);

/**
 * @route GET /user/me
 * @description Get the profile of the authenticated user.
 * @param {string} Authorization - User's authentication token.
 * @returns {object} - User profile.
 */
userRouter.get("/user/me/", authenticateUser, getOwnUserProfile);

/**
 * @route PUT /user/update
 * @description Update the profile of the authenticated user.
 * @param {string} Authorization - User's authentication token.
 * @param {User} body - Updated user data.
 * @returns {object} - Updated user profile.
 */
userRouter.put("/user/update/", authenticateUser, updateOwnUserProfile);

// Admin routes

/**
 * @route GET /admin/users
 * @description Get a list of all users (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @returns {Array<User>} - List of users.
 */
userRouter.get("/admin/users", [authenticateUser, authenticateAdmin], getUsers);

/**
 * @route GET /admin/user/:id
 * @description Get details of a specific user by ID (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - User ID.
 * @returns {User} - Details of the user.
 */
userRouter.get(
  "/admin/user/:id",
  [authenticateUser, authenticateAdmin],
  getUser
);

/**
 * @route DELETE /admin/user/delete-all
 * @description Delete all users (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @returns {Array<User>} - List of deleted users.
 */
userRouter.delete(
  "/admin/user/delete-all/",
  [authenticateUser, authenticateAdmin],
  deleteUsers
);

/**
 * @route DELETE /admin/user/delete/:id
 * @description Delete a specific user by ID (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - User ID.
 * @returns {User} - Deleted user.
 */
userRouter.delete(
  "/admin/user/delete/:id",
  [authenticateUser, authenticateAdmin],
  deleteUser
);

/**
 * @route PUT /admin/user/update/:id
 * @description Update details of a specific user by ID (admin access).
 * @param {string} Authorization - User's authentication token.
 * @param {string} AdminAuthorization - Admin's authentication token.
 * @param {string} id - User ID.
 * @param {User} body - Updated user data.
 * @returns {User} - Updated user profile.
 */
userRouter.put(
  "/admin/user/update/:id",
  [authenticateUser, authenticateAdmin],
  updateUser
);

export default userRouter;

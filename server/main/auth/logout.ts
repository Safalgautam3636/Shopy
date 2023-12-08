import { NextFunction, Request, Response } from "express";
import User from "../models/interfaces/User";
import { URequest, UResponse } from "../types";
const logout = (req: URequest, res: UResponse, next: NextFunction) => {
  // TODO: Pass credentials?
  console.log("logout attempt");
  const { username, password } = req.body.user;
};
export default logout;

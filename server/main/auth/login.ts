import { NextFunction,Request,Response } from "express";
import User from "../models/interfaces/User";
const login = (req:Request,res:Response,next:NextFunction) => {
    const { username, password } = req.body.user;
    
}
export default login;
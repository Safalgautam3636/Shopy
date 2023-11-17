
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";

const signup = async (req: Request, res: Response) => {
    console.log(req.body)
    const { username, email, password ,address} = req.body;

    const userName = UserModel.findOne({
        email
    });
    const userEmail = UserModel.findOne({
        username
    });

    if (userName!==null || userEmail!==null) {
        const newUser = new UserModel({
            username,
            email,
            password,
            address
        });
        await newUser.save();
        
    }

}
export default signup;

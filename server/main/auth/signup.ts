import { hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";

const signup = async (req: Request, res: Response) => {
    const { username, email, password, address } = req.body;

    const userName = await UserModel.findOne({
        email
    });
    const userEmail = await UserModel.findOne({
        username
    });
    if (userName !== null || userEmail !== null) {
        res.json({
            "message": "User already exists",
        })
    }
    else {
        const userData = {
            username,
            email,
            password,
            address
        }

        const { error, value } = validateUserSchema.validate(userData);
        console.log(error, value)
        if (!error) {
            value.password = await hashPassword(password);
            console.log(value);
            await new UserModel(value).save();
        }
    }

}
export default signup;

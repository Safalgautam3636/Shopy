import { comparePassword, hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
        username
    });
    if (user !== null) {
        const check = await comparePassword(password, user.password);
        console.log(check);
        if (!check) {
            res.json({
                "message": "Invalid password!"
            });
        }
        else {
            res.json({
                "message": "User is valid"
            })
        }
    }
    else {
        return res.json({
            "message": "User doesnot exists!",
        })

    }

}
export default login;

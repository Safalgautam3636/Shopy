import { comparePassword, hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";
import { URequest, UResponse } from "../types";
import { generateToken} from './authHelpers/jwtHelpers';

const login = async (req: URequest, res: UResponse): Promise<UResponse>=> {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username
        });
        if (user !== null) {
            const check = await comparePassword(password, user.password);
            if (!check) {
                return res.json({
                    "message": "Invalid password!"
                });
            }
            else {
                const token = generateToken({ username: user._id, isAdmin: user.isAdmin });
                res.setHeader('Auth', token);
                return res.json({
                    "message": "User is valid",
                    token: token
                })
            }
        }
        else {
            return res.json({
                "message": "User doesnot exists!",
            })

        }
    }
    catch (err) {
        return res.json({
            message: "Internal server error",
            err:err
        })
    }
    

}
export default login;

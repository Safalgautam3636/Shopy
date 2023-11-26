import { comparePassword, hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";
import { URequest, UResponse } from "../types";
import { generateToken} from './authHelpers/jwtHelpers';

const login = async (req: URequest, res: UResponse) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username
        });
        if (user !== null) {
            const check = await comparePassword(password, user.password);
            if (!check) {
                res.json({
                    "message": "Invalid password!"
                });
            }
            else {

                //after sucessfully getting authenticated pass into the jwt
                // console.log("this is excecuting...")
                // console.log(user.username)

                const token = generateToken({ username: user.username, isAdmin: user.isAdmin });
                res.setHeader('Auth', token);
                res.json({
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

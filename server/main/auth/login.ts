import { comparePassword, hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";
import { generateToken,verityToken } from './authHelpers/jwtHelpers';

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
            
            //after sucessfully getting authenticated pass into the jwt
            console.log("this is excecuting...")
            console.log(user.username)
            const token= generateToken(user.username);
            res.json({
                "message": "User is valid",
                token:token
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

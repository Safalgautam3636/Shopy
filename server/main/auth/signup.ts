import { hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel from "../models/schemas/User";
import { Request, Response, NextFunction } from "express";
import { URequest, UResponse } from "../types";
import { generateToken } from './authHelpers/jwtHelpers';

const signup = async (req: URequest, res: UResponse) => {
    try {
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
                const token = generateToken({ username: value.username, isAdmin: value.isAdmin });
                const newUser = await new UserModel(value).save();
                return res.json({
                    newUser,
                    token
                })
            }
        }

    }
    catch (err) {
        return res.json({
            message: "Internal server error",
            error:err
        })
    }
    
}
export default signup;

import { hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";
import { generateToken } from './authHelpers/jwtHelpers';
import User from '../models/interfaces/User';

const signup = async (req: URequest, res: UResponse): Promise<UResponse>=> {
    try {
        const { username, email, password, address } :User= req.body as UserDocument;

        const userName:UserDocument|null = await UserModel.findOne({
            username
        });
        const userEmail:UserDocument|null = await UserModel.findOne({
            email
        });
        if (userName !== null || userEmail !== null) {
            return res.json({
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
            if (!error) {
                value.password = await hashPassword(password);
                const newUser = new UserModel(value);
                await newUser.save();
                const token = generateToken({ _id: newUser._id, isAdmin: value.isAdmin });
                return res.json({
                    newUser,
                    token
                })
            }
            return res.json({
                message: "Please add genuine password!",
                error: error
            })
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

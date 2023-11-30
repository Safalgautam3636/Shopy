import { hashPassword } from './authHelpers/passwordHelpers';

import validateUserSchema from "../models/joi/user";
import UserModel, { UserDocument } from "../models/schemas/User";
import { URequest, UResponse } from "../types";
import { generateToken } from './authHelpers/jwtHelpers';
import User from '../models/interfaces/User';

const signup = async (req: URequest, res: UResponse): Promise<UResponse>=> {
    try {
        console.log('this is debug')
        const { username, email, password, address } :User= req.body as UserDocument;

        const userName:UserDocument|null = await UserModel.findOne({
            email
        });
        const userEmail:UserDocument|null = await UserModel.findOne({
            username
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

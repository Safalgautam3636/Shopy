
import { ObjectId } from 'mongodb';

// all functions written here are for the admin accessbility to users

// get all Users
//get specific user
// update user
// delete users
// delete user

import { UResponse, URequest } from "../types";
import UserModel, { UserDocument } from '../models/schemas/User';
import validateUserSchema from '../models/joi/user';
import User from '../models/interfaces/User';

const getUser = async(req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const user = await UserModel.findOne({ _id: new ObjectId(req.params.id) });
        return res.json({
            user,
            message:"User profile fetched!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const getUsers = async(req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const user: UserDocument[] | null = await UserModel.find();
        if (user !== null) {
            return res.json({
                user,
                message: "Users fetched!"
            })
        }
        return res.json({
            message: "Couldnot find the users!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const updateUser = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const userId = new ObjectId(req.params.id);
        const user: UserDocument | null = await UserModel.findOne({
            _id: userId
        }) as UserDocument;

        const newUser = {
            ...user?.toObject(),
            ...req.body
        };
        delete newUser._id;
        delete newUser.__v;
        const { error, value } = validateUserSchema.validate(newUser);
        if (!error) {
            const update = await UserModel.updateOne({ _id: userId }, { $set: value }, { new: true });
            return res.json({
                update,
                message: "Users updated!"
            })
            
        }
        return res.json({
            message: "Couldnot find the users!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const deleteUser = async(req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const userId = new ObjectId(req.params.id);
        const user: UserDocument | null = await UserModel.findOne({ _id: userId });
        if (user !== null) {
            await UserModel.deleteOne({ _id: userId },{new:true});
            return res.json({
                message: "User deleted!"
            })
        }
        return res.json({
            message: "Couldnot find the user!"
        })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}
const deleteUsers = async (req: URequest, res: UResponse): Promise<UResponse> => {
    try {
            await UserModel.deleteMany();
            return res.json({

                message: "Users deleted!"
            })
    }
    catch (err) {
        return res.json({
            err,
            message: "Internal Server Error!"
        })
    }
}

export {
    getUser,
    getUsers,
    deleteUser,
    deleteUsers,
    updateUser
};
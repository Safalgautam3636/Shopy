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

const getUser = async(req: URequest, res: UResponse): Promise<UResponse> => {
    try {
        const userId = new ObjectId(req.params.id);
        const user: UserDocument | null = await UserModel.findOne({ _id: userId });
        if (user !== null) {
            return res.json({
                user,
                message: "User fetched!"
            })
        }
        return res.json({
            message:"Couldnot find the user!"
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
        const user: UserDocument[] | null = await UserModel.find({
            _id:userId
        });
        const updateuser = { user, ...req.body };

        const { error, value } = validateUserSchema.validate(updateuser);
        if (!error) {
            const update = await UserModel.updateOne({ _id: userId }, { $set: updateUser }, { new: true });
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
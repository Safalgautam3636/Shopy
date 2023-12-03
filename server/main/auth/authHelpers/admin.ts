
import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { verifyToken } from './jwtHelpers';
import { URequest, UResponse } from "../../types";
import UserModel, { UserDocument } from '../../models/schemas/User';

interface DecodedUser  {
    _id: string,
    isAdmin: boolean
};

interface Decoded  {
    user: DecodedUser,
    iat: number,
    exp: number
};

const authenticateAdmin = async (req: URequest, res: UResponse, next: NextFunction): Promise<UResponse|undefined> => {
    const token = req.header('Auth');
    if (!token) {
        return res.json({
            message: 'No token provided',
        })
    }
    
    const decoded:Decoded = verifyToken(token) as Decoded;
    req.user = decoded.user;
    const user: UserDocument | null = await UserModel.findOne({ _id: req.user._id });
    if (!user?.isAdmin) {
        return res.json({
            message: "You have to be an admin for this operation!"
        })
        
    }
    next();
    
}

export default authenticateAdmin;
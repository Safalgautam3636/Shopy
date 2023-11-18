import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { verifyToken } from './jwtHelpers';
import { URequest, UResponse } from "../../types";
import UserModel from '../../models/schemas/User';


const authenticateAdmin = async(req: URequest, res: UResponse, next: NextFunction) => {
    const token = req.header('Auth');

    if (!token) {
        return res.json({
            message: 'No token provided',
        })
    }
    else {
        const decoded = verifyToken(token);
        req.user = decoded;
        const user = await UserModel.findOne({ username: req.user.payload });
        if (user?.isAdmin) {
            next();
        }
        
    }
}

export default authenticateAdmin;
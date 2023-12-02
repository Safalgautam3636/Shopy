import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { verifyToken } from './jwtHelpers';
import { URequest, UResponse } from "../../types";

type UserResponse = { _id: string, isAdmin: boolean };
type Decoded = {
    user: UserResponse,
    iat: number,
    exp: number
}
const authenticateUser = (req: URequest, res: UResponse, next: NextFunction) => {
    const token = req.header('Auth');
    if (!token) {
        return res.json({
            message: 'No token provided',
        })
    }
    else {
        const decoded: Decoded = verifyToken(token) as Decoded;
        const user: UserResponse= decoded.user;
        req.user = user._id;
        next();
    }
}

export default authenticateUser;
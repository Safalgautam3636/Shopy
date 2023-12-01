import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { verifyToken } from './jwtHelpers';
import { URequest, UResponse } from "../../types";

type UserResponse = { username: string, isAdmin: boolean };
type Decoded = {
    user: UserResponse,
    iat: number,
    exp: number
}
const authenticateUser = (req: URequest, res: UResponse, next: NextFunction) => {
    const token = req.header('Auth');
    console.log(token);
    if (!token) {
        return res.json({
            message: 'No token provided',
        })
    }
    else {
        const decoded:Decoded= verifyToken(token) as Decoded;
        const  user :UserResponse= decoded.user;
        req.user = user.username;
        console.log('User',req.user)
        next();
    }
}

export default authenticateUser;
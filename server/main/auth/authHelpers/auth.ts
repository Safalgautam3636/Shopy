import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { verifyToken } from './jwtHelpers';
import { URequest, UResponse } from "../../types";


const authenticateUser = (req: URequest, res: UResponse, next: NextFunction) => {
    const token = req.header('Auth');
    console.log(token);
    if (!token) {
        return res.json({
            message: 'No token provided',
        })
    }
    else {
        const decoded = verifyToken(token);
        console.log(decoded)
        req.user = decoded;
        next();
    }
}

export default authenticateUser;
import { Request, Response } from "express";

type UserResponse = { _id: string, isAdmin: boolean };
type Decoded = {
    user: UserResponse,
    iat: number,
    exp: number
}

export interface URequest extends Request{
    user?:any;
}
export interface UResponse extends Response{
    
}
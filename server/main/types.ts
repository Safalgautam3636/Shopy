import { Request, Response } from "express";


export interface URequest extends Request{
    user?: any;
}
export interface UResponse extends Response{
    
}
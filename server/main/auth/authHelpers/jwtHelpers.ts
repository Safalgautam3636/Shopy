import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();




//function to generate JWT token

const generateToken = (payload: object):string => {
    
    const secretKey: string = process.env.JWT_SECRET as string;
    const token = Jwt.sign({ user:payload }, secretKey, { expiresIn: '1h' });
    return token;
}

// function to verify the token JWT

const verifyToken = (token: string): object | null => {
    const secretKey: string = process.env.JWT_SECRET as string;
    
    const decoded: object = Jwt.verify(token, secretKey) as object;
    console.log(secretKey)
    return decoded;
}

export { generateToken, verifyToken };
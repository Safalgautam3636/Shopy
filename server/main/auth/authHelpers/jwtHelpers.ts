import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


type UserResponse = { _id: string, isAdmin: boolean };
type Decoded = {
    user: UserResponse,
    iat: number,
    exp: number
}

//function to generate JWT token

const generateToken = (payload: UserResponse):string => {
    
    const secretKey: string = process.env.JWT_SECRET as string;
    const token = Jwt.sign({ user:payload }, secretKey, { expiresIn: '18760h' });
    return token;
}

// function to verify the token JWT

const verifyToken = (token: string): Decoded | null => {
    const secretKey: string = process.env.JWT_SECRET as string;
    
    const decoded: Decoded = Jwt.verify(token, secretKey) as Decoded;
    return decoded;
}

export { generateToken, verifyToken };
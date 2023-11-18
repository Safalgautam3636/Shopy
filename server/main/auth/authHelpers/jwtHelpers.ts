import Jwt from "jsonwebtoken";


const secretKey:string= process.env.JWT_SECRET as string;

//function to generate JWT token

const generateToken = (payload: object, expiresIn: string = '1h'): string => {
    return Jwt.sign(payload, secretKey, payload);
}

// function to verify the token JWT

const verityToken = (token: string): object | null => {
    const decoded:object = Jwt.verify(token, secretKey) as object;
    return decoded;
}

export { generateToken, verityToken };
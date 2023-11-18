import bcrypt from 'bcryptjs';

const saltRounds = 10;

//function to hash the password
export const hashPassword = async (password: string):Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword= await bcrypt.hash(password, salt);
    return hashedPassword;
}

//compare a password with its hash

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean>=>{
    return await bcrypt.compare(password,hashedPassword)
}
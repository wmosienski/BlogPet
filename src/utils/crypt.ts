import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (data: any, expiresIn?: number): string => {
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || '';
    return jwt.sign(data, JWT_SECRET_KEY, expiresIn ? {expiresIn} : undefined);
};

export const verifyToken = (token: string): any => {
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || '';
    return jwt.verify(token, JWT_SECRET_KEY);
};

export const hash = async (data: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
};

export const compare = async (data: string, hashedData: string): Promise<boolean> => {
    return await bcrypt.compare(data, hashedData);
};
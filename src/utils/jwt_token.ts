import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (payload:object)=>{
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn:'15d'})
        return token
} 

export const verifyToken = (token:string, res:Response) =>{
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    return user;
}


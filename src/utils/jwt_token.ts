import jwt from 'jsonwebtoken';

export const generateToken = (payload: object,exp:object = {expiresIn:'1h'}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string , exp )
    return token
}

export const verifyToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    return user;
}


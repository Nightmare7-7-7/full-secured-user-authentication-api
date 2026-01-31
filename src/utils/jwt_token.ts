import jwt from 'jsonwebtoken';

export const generateToken = (payload: object) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15d' })
    return token
}

export const verifyToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    return user;
}


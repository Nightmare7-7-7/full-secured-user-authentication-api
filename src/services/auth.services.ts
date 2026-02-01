import { Response } from 'express';
import { comparePassword, hashPassword } from './../utils/hash';
import { prisma } from "../prisma";
import { returnError } from '../utils/error';
import { generateToken, verifyToken } from '../utils/jwt_token';
import mail from '../utils/mailer';
import mailContent from '../utils/mailContent';

export const createUser = async (fullname: string, email: string, password: string) => {

    // Check if user already exists
    const exists = await prisma.user.findUnique({
        where: { email }
    });

    if (exists) {
        throw new returnError(400, "user with this email already exists");
    }

    // pass password to hashPassword utility function
    const hashed = await hashPassword(password);

    if (!hashed) {
        throw new returnError(500, "Internal server error");
    }

    // create user with only selected fields in return

    const user = await prisma.user.create({
        data: {
            fullName: fullname,
            email,
            password: hashed
        },
        select: {
            id: true,
            fullName: true,
            email: true
        }
    })

    //return user to controller
    return user;




}


export const loginUser = async (email: string, password: string) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new returnError(400, "Invalid email or password");
    }

    //pass it to compare password utility function
    const isPasswordValid = await comparePassword(user.password, password);

    if (!isPasswordValid) {
        throw new returnError(400, "Invalid email or password");
    }

    const token = await generateToken({ id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin }, { expiresIn: '15d' });

    if (!token) {
        throw new Error("Internal server error");
    }

    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        auth_token: token
    };

}


export const sendReset = async (email: string, newPassword: string) => {
    // Implementation for password reset

    if (!email) {
        throw new returnError(400, "Email is required");
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new returnError(400, "User with this email does not exist")
    }

    const hashed = await hashPassword(newPassword);

    if (!hashed) {
        throw new Error("Internal server error");
    }

    const token = await generateToken({ email, hash: hashed }, { expiresIn: '10m' });

    if (!token) {
        throw new Error("Internal server error");
    }

    //now sending to email process

    const send = await mail.sendMail({
        from: process.env.EMAIL as string,
        to: email,
        subject: "Password Reset Link",
        html: mailContent(token)
    });

    if (!send) {
        throw new returnError(500, "Failed to send email. Please try again later.");
    }

    return;




}


export const verifyResetToken = async (token: string) => {
    // Implementation for verifying reset token
    if (!token) {
        throw new returnError(400, "Please send us your reset token");
    }

    const payload = await verifyToken(token);

    const { email, hash } = payload as { email: string, hash: string };

    const user = await prisma.user.update({
        where: { email: email },
        data: { password: hash },
        select: {
            fullName: true,
        }
    });

    if (!user) {
        throw new returnError(500, "Failed to reset password. Please try again later.");
    }

    return user;

}
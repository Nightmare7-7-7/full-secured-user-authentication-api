import { Response } from 'express';
import { comparePassword, hashPassword } from './../utils/hash';
import { prisma } from "../prisma";
import { returnError } from '../utils/error';
import { generateToken } from '../utils/jwt_token';

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

    const token = await generateToken({ id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin });

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


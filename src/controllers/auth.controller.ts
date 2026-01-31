import { registerValidator, loginValidator } from "../validators/auth.validator";
import { returnError } from "../utils/error";
import { createUser, loginUser } from "../services/auth.services";
import { Request, Response } from "express";
import { ZodError } from "zod"; // Import ZodError


interface User {
    fullname: string;
    email: string;
    password: string;
}

export const createAccount = async (req: Request, res: Response) => {
    try {
        // Parse will throw ZodError if validation fails
        const { fullname, email, password }: User = registerValidator.parse(req.body);

        const user = await createUser(fullname, email, password);

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: user
        });

    } catch (err: any) {

        // Check if it's a Zod validation error
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: err.issues[0].message,
            })
        }

        //Check if it's the error of our custom returnError
        if (err instanceof returnError) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })

    }
}


export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginValidator.parse(req.body);

        const user = await loginUser(email, password);

        res.cookie("auth_token", user.auth_token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });

    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: err.issues[0].message,
            })
        }


        if (err instanceof returnError) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })

    }

}


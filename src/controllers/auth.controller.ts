import { registerValidator, loginValidator, resetValidator } from "../validators/auth.validator";
import { returnError } from "../utils/error";
import { createUser, loginUser, sendReset, verifyResetToken } from "../services/auth.services";
import { Request, Response } from "express";
import { success, ZodError } from "zod"; // Import ZodError


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


export const ResetPassword = async (req: Request, res: Response) => {
    try {
        // Implementation for password reset
        const { email, newPassword } = resetValidator.parse(req.body);

        const user = await sendReset(email, newPassword);

        return res.status(200).json({
            success: true,
            message: "Password reset link has been sent to your email",

        });

    } catch (err: any) {
        if (err instanceof returnError) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message
            });
        }

        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: err.issues[0].message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            err: err.message
        });
    }
}


export const Verfy = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;

        const valid = await verifyResetToken(token);

        return res.status(200).json({
            success: true,
            message: `Hello, ${valid.fullName} Your password has been reseted successfully`
        });

    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(400).json({
                success: false,
                message: "Reset token has been expired"
            });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        if (err instanceof returnError) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });


    }
}
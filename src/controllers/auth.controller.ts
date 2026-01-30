import { registerValidator } from "../validators/auth.validator";
import { ReturnError } from "../utils/error";
import { createUser } from "../services/auth.services";
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

        const user = await createUser(res, fullname, email, password);
        if (!user) return; // Exit if user creation failed and error was already sent

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: user
        });

    } catch (err: any) {
        // Check if it's a Zod validation error

        if (err instanceof ZodError) { 
            // returning only the first error message in array of issues
            ReturnError(res, 400, err.issues[0].message);
            return;
        }
        
        return ReturnError(res, 500, err);
    }
}
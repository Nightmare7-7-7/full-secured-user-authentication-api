import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt_token";




const verfyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["auth_token"] || req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = await verifyToken(token as string);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        req.user = decoded;
        next();

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Malformed Token"
        })
    }
}

export default verfyUser;
import { createAccount, Login, ResetPassword,Verfy } from "../controllers/auth.controller";
import verfyUser from "../middlewares/verfyUser.middleware";
import express from "express";

const route = express.Router();

route.post("/create", createAccount);
route.post("/login", Login);
route.get("/me",verfyUser, (req, res)=>{
    return res.status(200).json({
        success: true,
        message: "Hello authenticated user",
        data: req.user
    })
});

route.post("/reset-password", ResetPassword);
route.get("/reset-password/verfy", Verfy);

export default route;
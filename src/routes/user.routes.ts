import { createAccount, Login } from "../controllers/auth.controller";
import express from "express";

const route = express.Router();

route.post("/create", createAccount);
route.post("/login", Login);
export default route;
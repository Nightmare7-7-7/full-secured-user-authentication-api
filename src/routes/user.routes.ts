import { createAccount } from "../controllers/auth.controller";
import express from "express";

const route = express.Router();

route.post("/create", createAccount);

export default route;
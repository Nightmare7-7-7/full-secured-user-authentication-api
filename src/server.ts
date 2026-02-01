import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

//load env variables
dotenv.config();

//global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true, // send rate limit info in headers
  legacyHeaders: false,
});


const app = express();
app.use(express.json());
app.use(helmet());
app.use(globalLimiter);


const PORT = Number(process.env.PORT) || 8181;

//start server
app.listen(PORT, () => {
     console.log(`Server is running on port http://localhost:${PORT}`);
})
 

//api paths
app.use("/api/account", userRoutes);
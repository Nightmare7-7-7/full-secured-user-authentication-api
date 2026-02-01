import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import helmet from "helmet";

//load env variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());


const PORT = Number(process.env.PORT) || 8181;


//start server
app.listen(PORT, () => {
     console.log(`Server is running on port http://localhost:${PORT}`);
})
 

//api paths
app.use("/api/account", userRoutes);
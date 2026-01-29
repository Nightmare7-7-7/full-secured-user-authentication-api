import express from "express";
import dotenv from "dotenv";

//load env variables
dotenv.config();

const app = express();
app.use(express.json());


const PORT = Number(process.env.PORT) || 3000


//start server
app.listen(PORT, () => {
     console.log(`Server is running on port http://localhost:${PORT}`);
})
 
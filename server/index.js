import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import { router } from './routes/user.routes.js';
import {router as authRouter} from './routes/auth.routes.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())

app.use(express.json()); // Middleware to parse JSON request bodies

//connecting to mongodb using mongoose package
mongoose.connect(process.env.MONGODB_URL, {dbName: "Ab-Lammy-Sam"})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

mongoose.connection.once("connected", () => {
    console.log("Connected Database", mongoose.connection.name);
})

app.use("/api/v1/users", router);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
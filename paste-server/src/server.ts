import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT;

// Fundamental Middlewares
app.use(express.json());

async function startDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log("Paste-Server MongoDB Connected.");
}

startDB();
app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));

export { app };

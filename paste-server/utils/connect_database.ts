import mongoose from "mongoose";
import { DatabaseConnectionError } from "../src/errors/database_connection_error";

async function startDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI must be defined");
        }
        mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Paste-Server MongoDB Connected.");
    } catch (err) {
        throw new DatabaseConnectionError();
    }
}

export { startDB };

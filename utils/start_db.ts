import mongoose from "mongoose";

async function startDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI must be defined");
        }
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY must be defined");
        }
        mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB Connected.");
    } catch (err) {
        throw new Error("Error connecting to database");
    }
}

export { startDB };

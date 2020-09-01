import express, { Request, Response, NextFunction } from "express";
import { error_handler } from "./middlewares/error-handler";
import { signup_router } from "./routes/";

import * as dotenv from "dotenv";
dotenv.config();

import { startDB } from "../utils/connect_database";

const app = express();
const PORT = process.env.PORT;

// Fundamental Middlewares
app.use(express.json());

// Routes
app.use(signup_router);

// Not Route Hits
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err: Error = new Error("Page Doesn't Exist.");
    req.statusCode = 404;
    next(err);
});

app.use(error_handler);

startDB();
app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));

export { app };

import express, { Request, Response, NextFunction } from "express";
import {
    create_paste_router,
    get_paste_router,
    delete_paste_router,
    update_paste_router,
    get_raw_paste_router
} from "./routes/";
import { error_handler } from "./middlewares/error-handler";

import * as dotenv from "dotenv";
dotenv.config();

import { startDB } from "../utils/connect_database";

const app = express();
const PORT = process.env.PORT;

// Fundamental Middlewares
app.use(express.json());

app.use(
    create_paste_router,
    get_paste_router,
    get_raw_paste_router,
    delete_paste_router,
    update_paste_router
);

// Not Route Hits
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err: Error = new Error("Doesn't Exist.");
    req.statusCode = 404;
    next(err);
});

app.use(error_handler);

startDB();
app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));

export { app };

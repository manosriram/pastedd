import express, { Request, Response, NextFunction } from "express";
const app = express();
const PORT = process.env.PORT || 6464;

import { error_handler } from "./utils/";
import cookieSession from "cookie-session";

import * as dotenv from "dotenv";
dotenv.config();

// Fundamental Middlewares
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);

import {
    create_paste_router,
    get_paste_router,
    delete_paste_router,
    update_paste_router,
    get_raw_paste_router,
    get_user_pastes
} from "./routes/pastes";
import {
    signup_router,
    signin_router,
    signout_router,
    getuser_router,
    current_user_router
} from "./routes/auth";

import { startDB } from "./utils/start_db";

// Routes
app.use("/u/current_user", current_user_router);
app.use("/u/signup", signup_router);
app.use("/u/signin", signin_router);
app.use("/u/signout", signout_router);
app.use("/u/:user_name", getuser_router);

app.use(
    "/p/",
    get_user_pastes,
    get_paste_router,
    get_raw_paste_router,
    create_paste_router,
    delete_paste_router,
    update_paste_router
);

app.use(error_handler);

startDB();
app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));

export { app };

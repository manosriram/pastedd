import express from "express";
import { NotFoundError } from "./errors/not_found_error";
import { errorHandler } from "./middlewares/error_handler";

import * as dotenv from "dotenv";
dotenv.config();

import { startDB } from "../utils/connect_database";

const app = express();
const PORT = process.env.PORT;

// Fundamental Middlewares
app.use(express.json());

// Not Route Hits
app.all("*", async () => {
    throw new NotFoundError();
});

startDB();
app.use(errorHandler);
app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));
export { app };

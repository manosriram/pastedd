import express, { Request, Response, NextFunction } from "express";
const app = express();
const PORT = process.env.PORT || 8082;

// Important Middlewares
app.use(express.json());



app.listen(PORT, () => console.log(`Paste-Server at ${PORT}`));

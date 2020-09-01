import { Request } from "express";
import jwt from "jsonwebtoken";

export async function current_user(req: Request) {
    if (!req.session?.jwt) return null;

    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    return payload;
}

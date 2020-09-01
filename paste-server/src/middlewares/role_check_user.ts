import { Request, Response, NextFunction } from "express";

async function role_check_user(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.current_user) next();
}

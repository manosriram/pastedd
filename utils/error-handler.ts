import { Request, Response, NextFunction } from "express";

export const error_handler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode);
    const is_prod = (process.env.NODE_ENV === "production");
        return res.json({
            message: error.message,
            stack: is_prod ? null : error.stack
        });
};

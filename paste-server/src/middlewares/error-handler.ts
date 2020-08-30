import { Request, Response, NextFunction } from "express";

export const error_handler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack:
            process.env.NODE_ENV === "production"
                ? "Not in Development"
                : error.stack
    });
};

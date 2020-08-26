import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

module.exports = (req: Request, res: Response, next: NextFunction) => {
    // paste_name,
    // paste_type,
    // paste_syntax,
    // paste_content,
    // paste_expiry_at,
    const {
        paste_name,
        paste_type,
        paste_syntax,
        paste_content,
        paste_expiry_at
    } = req.body;
};

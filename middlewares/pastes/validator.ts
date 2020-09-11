import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validator = [
    check("paste_name")
        .isLength({ max: 32 })
        .withMessage("Paste name must be lesser that 32 characters."),
    check("paste_content")
        .notEmpty()
        .withMessage("Paste Content is required"),
    check("paste_type")
        .isIn(["public", "unlisted", "private"])
        .not()
        .withMessage("Paste type not supported"),
    check("paste_syntax")
        .notEmpty()
        .withMessage("Paste Syntax is required"),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) next();
        else throw new Error(errors.array()[0].msg);
    }
];

export { validator };

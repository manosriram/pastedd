import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request_validation_error";

const validator = [
    check("paste_name")
        .notEmpty()
        .withMessage("Paste Name is required"),
    check("paste_content")
        .notEmpty()
        .withMessage("Paste Content is required"),
    check("paste_type")
        .notEmpty()
        .withMessage("Paste Type is required"),
    check("paste_syntax")
        .notEmpty()
        .withMessage("Paste Syntax is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) next();
        else throw new RequestValidationError(errors.array());
    }
];

export { validator };

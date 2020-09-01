import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validator = [
    check("user_name")
        .isLength({ min: 4 })
        .withMessage("User should be of 4 characters minimum."),
    check("password")
        .isLength({ min: 4 })
        .withMessage("Password should be of 4 characters minimum"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) next();
        else throw new Error(errors.array()[0].msg);
    }
];

export { validator as signin_validator };


import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validator = [
    check("email")
        .isEmail()
        .withMessage("Email not in format."),
    check("password")
        .isLength({ min: 4 })
        .withMessage("Password should be of length 4 minimum"),
    check("user_name")
        .isLength({ min: 4 })
        .withMessage("Username should be of length 4 minimum"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) next();
        else throw new Error(errors.array()[0].msg);
    }
];

export { validator as signup_validator };

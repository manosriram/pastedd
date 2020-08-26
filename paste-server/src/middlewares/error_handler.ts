import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom_error";

/*
    Error-Handler to handle erros consistently.
*/
export const error_handler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }

    console.log("hitting");
    return res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    });
};

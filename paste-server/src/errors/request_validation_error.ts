import { ValidationError } from "express-validator";
import { CustomError } from "./custom_error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super("Validation Error");

        // Just because 'Error' is a built-in class.
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        });
    }
}

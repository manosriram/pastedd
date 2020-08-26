import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super("Route Not Found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: "Not Found"
            }
        ];
    }
}

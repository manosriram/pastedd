import { CustomError } from "./custom_error";

export class RouteNotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super("Route Not Found");
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: "Not Found"
            }
        ];
    }
}

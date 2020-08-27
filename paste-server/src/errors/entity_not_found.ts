import { CustomError } from "./custom_error";

export class EntityNotFoundError extends CustomError {
    statusCode = 404;
    message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ];
    }
}

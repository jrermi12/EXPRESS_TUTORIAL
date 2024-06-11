import CustomAPIError, { ErrorCode } from "./custom.errors";

class NotFoundError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null);
        this.statusCode = 404;
    }
}

export default NotFoundError;
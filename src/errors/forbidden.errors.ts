import CustomAPIError, { ErrorCode } from "./custom.errors";

class ForbiddenError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 403, null);
        this.statusCode = 403;
    }
}

export default ForbiddenError;
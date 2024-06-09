import CustomAPIError, { ErrorCode } from "./custom.errors";

class InternalserverError extends CustomAPIError {
  statusCode: number;
  constructor(message:string, errorCode: ErrorCode)  {
    super(message, errorCode, 500, null);
        this.statusCode = 500;
  }
}

export default InternalserverError;
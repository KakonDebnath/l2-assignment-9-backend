import { TMessage } from "../interfaces/error";

class AppError extends Error {
  public statusCode: number;
  public errMessage: string;
  public errDetails: Record<string, unknown>;

  constructor(
    statusCode: number,
    message: TMessage,
    errMessage: string,
    errDetails: Record<string, unknown>,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errMessage = errMessage;
    this.errDetails = errDetails;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

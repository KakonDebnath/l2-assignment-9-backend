import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const validationErrorHandler = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errMessage = Object.values(err.errors)
    .map((value:mongoose.Error.ValidatorError | mongoose.Error.CastError) => value.message)
    .join(', ');

  const errDetails = err?.errors;

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessage: `${errMessage}`,
    errorDetails: { errDetails },
  };
};

export default validationErrorHandler;

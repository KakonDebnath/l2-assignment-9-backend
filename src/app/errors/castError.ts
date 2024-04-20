import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const castErrorHandler = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {

  const errMessage = err?.message;

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessage: `${errMessage}`,
    errorDetails: { err },
  };
};

export default castErrorHandler;

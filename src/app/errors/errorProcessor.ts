import { ZodError } from 'zod';
import { TGenericErrorResponse, TMessage } from '../interfaces/error';
import zodErrorHandler from './zodError';
import duplicateErrorHandler from './duplicateError';
import validationErrorHandler from './validationError';
import mongoose from 'mongoose';
import castErrorHandler from './castError';
import AppError from './AppError';

const errorProcessor = (err: any): TGenericErrorResponse => {
     
  if (err instanceof ZodError) {
    return zodErrorHandler(err);

  } else if (err?.code === 11000) {
    return duplicateErrorHandler(err);

  } else if (err instanceof mongoose.Error.ValidationError) {
    return validationErrorHandler(err);

  } else if (err instanceof mongoose.Error.CastError) {
     return castErrorHandler(err);
    
  } else if (err instanceof AppError) {
    return {
        statusCode: err.statusCode,
        message: err.message as TMessage,
        errorMessage: err.errMessage,
        errorDetails: err.errDetails,
      };
  }
  return {
    statusCode: 500,
    message: 'Unknown',
    errorMessage: '',
    errorDetails: {},
  };
};

export default errorProcessor;


/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TGenericErrorResponse } from '../interfaces/error';

import errorProcessor from '../errors/errorProcessor';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TGenericErrorResponse = {
    statusCode: err.statusCode || 500,
    message: 'Validation Error' || 'Cast Error' || 'Duplicate Entry' || "Unknown",
    errorMessage: '',
    errorDetails: {},
  };

  errorResponse = errorProcessor(err);

  return res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorMessage
errorDetails
stack
*/

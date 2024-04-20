import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const duplicateErrorHandler = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  //   const match = err.message.match(/"([^"]*)"/);
  const match = err.message.match(/"(.*?)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  return {
    statusCode: 409,
    message: 'Duplicate Entry',
    errorMessage: `'${extractedMessage}' this Value is all ready exists `,
    errorDetails: { err },
  };
};

export default duplicateErrorHandler;

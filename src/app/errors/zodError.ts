import { TGenericErrorResponse } from '../interfaces/error';
import { ZodError, ZodIssue } from 'zod';

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {

  const details = err.issues.map((issue :ZodIssue) => {
    const path =  issue?.path[issue.path.length - 1];
    const message = issue.message;
    return `${path} field ${message}`;
  })

  return {
    statusCode: 410,
    message: 'Validation Error',
    errorMessage: `${details}`,
    errorDetails: {details},
  };
};

export default zodErrorHandler;

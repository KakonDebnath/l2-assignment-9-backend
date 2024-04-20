export type TMessage = 'Validation Error' | 'Cast Error' | 'Duplicate Entry'| "Invalid ID" | "Unknown" | "Not Found";

export type TGenericErrorResponse = {
  statusCode: number;
  message: TMessage;
  errorMessage: string;
  errorDetails: Record<string, unknown>;
};

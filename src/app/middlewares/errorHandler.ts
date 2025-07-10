import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorDetails: any = err;

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errorDetails = err;
  }

  // You can handle other custom error types here later...

  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};

export default errorHandler;

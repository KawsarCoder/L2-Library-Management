import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorhandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    const simplifiedError: any = {
      name: err.name,
      errors: {},
    };
    for (const key in err.errors) {
      const error = err.errors[key];
      simplifiedError.errors[key] = {
        message: error.message,
        name: error.name,
        properties: {
          message: error.message,
          type: error.properties?.type,
          min: error.properties?.min,
        },
        kind: error.kind,
        path: error.path,
        value: error.value,
      };
    }

    res.status(400).json({
      message: "Validation error occurred",
      success: false,
      error: simplifiedError,
    });
    return;
  }
  res.status(err.statusCode || 500).json({
    message: err.message || "Unexpected error on the server",
    success: false,
    error: err,
  });
  return;
};
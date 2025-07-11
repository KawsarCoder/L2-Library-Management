import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    message: "No matching route found. Check your endpoint",
    success: false,
    error: "Requested item does not exist",
  });
};
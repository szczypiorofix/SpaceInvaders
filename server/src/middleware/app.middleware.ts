import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.info(`Request: ${request.method} ${request.originalUrl}`);
  next();
}

export function headerMiddleware(request: Request, response: Response, next: NextFunction) {
  response.header("Content-Type", "application/json");
  next();
}

export * from './error-middleware';

//import { Request, Response, NextFunction } from "express";
//import { errorMiddleware } from '@shopping-centre/error-handler';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(message: string, statusCode: number, isOperational = true, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, AppError);
  }
}


// NOT FOUND ERROR
export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details?: any) {
    super(message, 404, true, details);
  }
}

// VALIDATION ERROR
export class ValidationError extends AppError {
  constructor(message = "Invalid data", details?: any) {
    super(message, 400, true, details);
  }
}

// Authentication Error
export class AuthError extends AppError {
  constructor(message = "Unauthorized", details?: any) {
    super(message, 401, true, details);
  }
}

// Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message = "Access Forbidden", details?: any) {
    super(message, 403, true, details);
  }
}

// Database Error
export class DatabaseError extends AppError {
  constructor(message = "Database Error", details?: any) {
    super(message, 500, true, details);
  }
}

// Rate Limit Error
export class RateLimitError extends AppError {
  constructor(message = "Too many requests, please try again later", details?: any) {
    super(message, 429, true, details);
  }
}

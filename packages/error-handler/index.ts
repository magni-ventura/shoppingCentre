export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(message: string, statusCode: number, isOperational = true, details? : any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, AppError);
  }
}

//NOT FOUND ERROR
export class NotFoundError extends AppError {
  constructor(message = "Resources not found", statusCode: number,) {
    super(message, 404);
  }
}

//VALIDATION ERROR (used for joi/zod/react-hook-form validation errors)

export class validationError extends AppError {
  constructor(message = "Invalid data", details?: any) {
    super (message, 400, true, details);
  }
}

//Authentication Error
export class AuthError extends AppError {
  constructor(message = "Unauthorized", details?: any) {
    super (message, 401);
  }
}

//Forbidden Error (For In sufficient Permissions)
export class ForbiddenError extends AppError {
  constructor(message = "Access Forbidden", details?: any) {
    super (message, 403);
  }
}

//Database Error (For MongoDB/Postgres Errors)
export class DatabaseError extends AppError {
  constructor(message = "Database Error", details?: any) {
    super (message, 500, true, details);
  }
}

//RATE LIMIT ERROR (If user exceeds API limits)
export class RateLimitError extends AppError {
  constructor(message = "Too many requests, please tryagain later", details?: any) {
    super (message, 429);
  }
}
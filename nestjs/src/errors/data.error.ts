export class DatabaseError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DatabaseError';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
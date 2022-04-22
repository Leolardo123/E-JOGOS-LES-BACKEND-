import { NextFunction } from 'express';
import AppError from '@shared/errors/AppError';


function ensureAuthenticated(
  role: string,
  allowedRoles: string[],
  next: NextFunction,
): void {
  try {
    if (allowedRoles.includes(role)) {
      return next();
    } else {
      throw new AppError('Acesso negado', 401);
    }
  } catch (error) {
    throw new AppError('Token Inválido', 401);
  }
}

export { ensureAuthenticated };

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  expiresIn: number;
  subject: string;
  role?: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT inexistente!', 404);
  }

  const token = authHeader;

  try {
    const decoded = verify(token, auth.jwt.secret as string);

    const { subject, role } = decoded as ITokenPayload;

    request.body.user_id = subject;
    // request.body.role = role;

    return next();
  } catch (error) {
    throw new AppError('Token Inválido', 401);
  }
}

export { ensureAuthenticated };

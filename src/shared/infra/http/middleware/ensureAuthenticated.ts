import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  expiresIn: number;
  subject: string;
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

  // const [, token] = authHeader.split(' ');
  const token = authHeader;

  console.log(token)

  try {
    const decoded = verify(token, auth.jwt.secret as string);

    // const { sub } = decoded as ITokenPayload;
    const { subject } = decoded as ITokenPayload;

    console.log('teste2')
    console.log(decoded)

    // request.user = {
    //   id: sub,
    // };

    console.log('sub: ', subject)

    request.body = {
      user_id: subject,
    };

    return next();
  } catch (error) {
    throw new AppError('Token Inválido', 401);
  }
}

export { ensureAuthenticated };

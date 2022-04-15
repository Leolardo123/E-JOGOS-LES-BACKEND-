/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../../errors/AppError';

import winston from '@config/winston';
import { getEntityKeyName } from './TranslateKeyError';

export default function globalErrorHandling(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response<any> {

  if (err instanceof AppError) {
    winston.error(
      `${err.errorCode} - ${err.message} - ${request.originalUrl} - ${
        request.method
      } - ${request.ip} - body: ${request.body} - params: ${JSON.stringify(
        request.params,
      )}`,
    );
    return response.status(err.statusCode|500).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  if(err instanceof CelebrateError){
    let messageString;
    const { type, context } = err.details.values().next().value.details[0];

    const legibleKey = getEntityKeyName(context.key)
    switch (type) {
      case 'any.required':
        messageString = `O campo ${context.key} é obrigatório.`;
        break;
      case 'any.only':
        messageString = context.valids[0].path
          ? `O campo ${legibleKey} deve ter o mesmo valor do campo ${context.valids[0].key}.`
          : `O campo ${legibleKey} pode ter o(s) valor(es): ${context.valids}`;
        break;
      case 'object.base':
        messageString = `O campo ${legibleKey} deve ser do tipo objeto.`;
        break;
      case 'string.base':
        messageString = `O campo ${legibleKey} deve ser do tipo texto.`;
        break;
      case 'date.format':
        messageString = `O campo ${legibleKey} não é uma data válida`; 
        break;
      case 'string.guid':
        messageString = `O campo ${legibleKey} deve ser do tipo uuid.`;
        break;
      case 'string.empty':
        messageString = `O campo ${legibleKey} não pode ser um texto vazio.`;
        break;
      case 'string.min':
        messageString = `O campo ${legibleKey} não pode ser menor que ${context.limit} caracteres.`;
        break;
      case 'string.max':
        messageString = `O campo ${legibleKey} não pode ser maior que ${context.limit} caracteres.`;
        break;
      case 'string.email':
        messageString = `O campo ${legibleKey} deve ser um email válido.`;
        break;
      case 'number.base':
        messageString = `O campo ${legibleKey} deve ser do tipo número.`;
        break;
      case 'number.min':
        messageString = `O campo ${legibleKey} não pode ser menor que ${context.limit}.`;
        break;
      case 'number.max':
        messageString = `O campo ${legibleKey} não pode ser maior que ${context.limit}.`;
        break;
      case 'array.base':
        messageString = `O campo ${legibleKey} deve ser do tipo array.`;
        break;
      case 'array.empty':
        messageString = `O campo ${legibleKey} não pode ser vazio.`;
        break;
      case 'array.min':
        messageString = `O campo ${legibleKey} não pode ter um tamanho menor que ${context.limit}.`;
        break;
      case 'array.max':
        messageString = `O campo ${legibleKey} não podeer um tamanho maior que ${context.limit}.`;
        break;
      case 'individual_person.birth_date':
          messageString = `Data de nascimento não é válida.`;
          break;
      case 'object.unknown':
        messageString = `Campo ${legibleKey} não reconhecido.`;
        break;
      default:
        messageString = 'Aconteceu um erro tente novamente mais tarde.';
        break;
    }

    return response.status(400).json({
      status: 'error',
      message: messageString,
    });
  }

  winston.error(
    `${500} - ${err.message} - ${request.originalUrl} - ${request.method} - ${
      request.ip
    } - body: ${JSON.stringify(request.body)} - params: ${JSON.stringify(
      request.params,
    )} - query: ${JSON.stringify(request.query)} - date: ${new Date()}`,
  );

  return response.status(500).json({
    status: 'error',
    message: 'Server error',
  });
}



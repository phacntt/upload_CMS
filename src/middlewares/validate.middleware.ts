import { plainToInstance } from 'class-transformer';
import { Request, RequestHandler } from 'express';
import { HttpException } from '../exception/HttpException';
import { validate, ValidationError } from 'class-validator';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
    return (req: Request, res, next) => {
        validate(plainToInstance(type, (req as any)[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted}).then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints as any)).join(', ');
            next(new HttpException(400, message))
          } else {
            next();
          }
        });
    }
};

export default validationMiddleware;

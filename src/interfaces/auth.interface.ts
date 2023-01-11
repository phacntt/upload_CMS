import { User } from '@prisma/client';
import { Request } from 'express';


export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}


declare global{
  namespace Express {
      interface Request {
          user: User
      }
  }
}

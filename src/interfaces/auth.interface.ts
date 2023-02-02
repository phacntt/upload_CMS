import { User } from '@prisma/client';
import { Request } from 'express';


export interface DataStoredInToken {
  id: number;
  name: string;
  role: string
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: DataStoredInToken;
}


declare global{
  namespace Express {
      interface Request {
          user: User
      }
  }
}

export interface RequestWithUser extends Request {
  user: User;
}

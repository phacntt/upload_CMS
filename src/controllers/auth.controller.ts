import { User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { HttpException } from "../exception/HttpException";
import { CreateUserDto } from "../dto/user.dto";
import UserSerializer from "../serializers/user.seroalizers";

class AuthController {
    public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signUp(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;
      const { cookie, tokenData } = await this.authService.loginUser(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      this.authService.logoutUser(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController
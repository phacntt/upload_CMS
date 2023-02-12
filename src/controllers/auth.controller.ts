import { User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dto/user.dto";
import { HttpException } from "../exception/HttpException";
import UserService from "../services/user.service";
import { context } from "../types/context.type";
import { verify } from "jsonwebtoken";

class AuthController {
  public authService = new AuthService();
  public clients = context;

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
      res.cookie('Authorization', cookie.refreshToken, {
        httpOnly: true,
        maxAge: cookie.expiredIn,
        sameSite: "strict",
        domain: "cms-earning.vercel.app"
      })
      res.status(200).json({ data: {cookie, tokenData}, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) throw new HttpException(400, "Not found access token!!!!");

      const refreshToken = req.headers.cookie?.substring(req.headers.cookie.indexOf("Bearer")) || req.cookies.Authorization || req.body.refreshToken;

      if (!refreshToken) throw new HttpException(400, "Not found refresh token!!!");

      const _accessToken = await this.authService.refreshToken(accessToken.split("Bearer ")[1], refreshToken.split("Bearer ")[1]);


      res.status(200).json({ accessToken: _accessToken, message: 'create new access token successfull' });
    } catch (error: any) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      this.authService.logoutUser(userData);

      res.clearCookie('Authorization');
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController
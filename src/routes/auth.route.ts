import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validate.middleware";
import { CreateUserDto } from "../dto/user.dto";
import { BasicCredentialDto } from "../dto/creditical.dto";

class AuthRoute implements Routes {

    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.post(`/signup`,  validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`/refresh`, this.authController.refreshToken);
        this.router.post(`/login`, validationMiddleware(BasicCredentialDto, 'body'), this.authController.logIn);
        this.router.post(`/logout`, authMiddleware, this.authController.logOut);
    }
}

export default AuthRoute
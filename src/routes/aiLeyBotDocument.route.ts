import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validate.middleware";
import { CreateUserDto } from "../dto/user.dto";
import { BasicCredentialDto } from "../dto/creditical.dto";
import AiLeyBotDocumentController from "../controllers/aiLeyBotDocument.controller";

class AiLeyBotDocument implements Routes {

    public path = '/aiLeyBot';
    public router = Router();
    public aiLeyBotController = new AiLeyBotDocumentController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        // this.router.get(`/1`, this.aiLeyBotController.aiLeyBotResponseS)
        this.router.get(`/`, this.aiLeyBotController.aiLeyBotResponse);
    }
}

export default AiLeyBotDocument
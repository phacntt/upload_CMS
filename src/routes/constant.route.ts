import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import ConstantController from "../controllers/constant.controller";

class ConstantRoute implements Routes {

    public path = '/constant';
    public router = Router();
    public constantController = new ConstantController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, authMiddleware, this.constantController.getConstant);
        this.router.post(`/`, authMiddleware, this.constantController.createConstant);
        this.router.put(`/:id`, authMiddleware, this.constantController.updateValueConstant);

    }
}

export default ConstantRoute
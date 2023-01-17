import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import CategoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";

class CategoryRoute implements Routes {

    public path = '/categories';
    public router = Router();
    public categoryController = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.categoryController.getCategories);
        this.router.get(`/:id`, this.categoryController.getCategoryById);
        this.router.post(`/`, authMiddleware, this.categoryController.createCategory);

    }
}

export default CategoryRoute
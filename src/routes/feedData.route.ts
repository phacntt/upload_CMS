import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Routes } from "../interfaces/routes.interface";
import CategoryController from "../controllers/category.controller";
import FeedDataController from "../controllers/feedData.controller";

class FeedDataRoute implements Routes {

    public path = '/feedData';
    public router = Router();
    public feedDataController = new FeedDataController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/product`, this.feedDataController.getProducts);
        this.router.get(`/category`, this.feedDataController.getCategory);
        // this.router.post(`/`, this.feedDataController.createCategory);

    }
}

export default FeedDataRoute
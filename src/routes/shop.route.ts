import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Routes } from "../interfaces/routes.interface";
import CategoryController from "../controllers/category.controller";
import ProductController from "../controllers/product.controller";
import ShopController from "../controllers/shop.controller";

class ShopRoute implements Routes {

    public path = '/shops';
    public router = Router();
    public shopController = new ShopController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.shopController.getShops);
        this.router.get(`/:id`, this.shopController.getShopById);
        this.router.post(`/`, authMiddleware, this.shopController.createShops);

    }
}

export default ShopRoute
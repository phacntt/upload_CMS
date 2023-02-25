import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Routes } from "../interfaces/routes.interface";
import CategoryController from "../controllers/category.controller";
import ProductController from "../controllers/product.controller";

class ProductRoute implements Routes {

    public path = '/products';
    public router = Router();
    public productController = new ProductController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.productController.getProducts);
        this.router.get(`/redirect`, this.productController.redirectProductURL);
        this.router.get(`/:id`, this.productController.getProductById);
        this.router.post(`/`, this.productController.createProduct)
    }
}

export default ProductRoute
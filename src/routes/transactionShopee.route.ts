import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import CategoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";
import TransactionShopeeController from "../controllers/transactionShopee.controller";

class TransactionShopeeRoute implements Routes {

    public path = '/transactionShopee';
    public router = Router();
    public transactionShopee = new TransactionShopeeController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.transactionShopee.getTransactions);
        this.router.post(`/`, authMiddleware, this.transactionShopee.createTransaction);
        // this.router.put(`/:id`, authMiddleware, this.transactionShopee.createCategory);

    }
}

export default TransactionShopeeRoute
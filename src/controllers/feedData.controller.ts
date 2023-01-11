import { Category, Product, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
import FeedDataService from "../services/feedData.service";

class FeedDataController {
    public feedDataService = new FeedDataService();
    
    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const param = req.query
            const productsData = await this.feedDataService.getProducts(param);

            res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
        next(error);
        }
    };

    public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { merchant } = req.query
            const productsData = await this.feedDataService.getCategories(merchant as string);

            res.status(200).json({ data: productsData, message: 'Get all category' });
        } catch (error) {
        next(error);
        }
    };

}

export default FeedDataController
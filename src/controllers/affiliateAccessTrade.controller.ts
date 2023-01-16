import { Category, Product, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
import FeedDataService from "../services/affiliateAccessTrade.service";
import AffiliateAccessTradeService from "../services/affiliateAccessTrade.service";
import { HttpException } from "../exception/HttpException";

class AffiliateAccessTradeController {
    public affiliateAccessTradeService = new AffiliateAccessTradeService();
    
    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const param = req.query
            const productsData = await this.affiliateAccessTradeService.getProducts(param);

            res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
        next(error);
        }
    };

    public getShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const param = req.query
            const productsData = await this.affiliateAccessTradeService.getShops(param);

            res.status(200).json({ data: productsData, message: 'Get all category' });
        } catch (error) {
        next(error);
        }
    };

    public getCampaigns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productsData = await this.affiliateAccessTradeService.getCampaigns();

            res.status(200).json({ data: productsData, message: 'Get all campaigns' });
        } catch (error) {
        next(error);
        }
    };

}

export default AffiliateAccessTradeController
import { Request, Response, NextFunction } from "express";
import AffiliateAccessTradeService from "../services/affiliateAccessTrade.service";

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

            res.status(200).json({ data: productsData, message: 'Get all shops' });
        } catch (error) {
        next(error);
        }
    };


}

export default AffiliateAccessTradeController
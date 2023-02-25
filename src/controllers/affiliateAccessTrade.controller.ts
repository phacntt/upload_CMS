import { Request, Response, NextFunction } from "express";
import AffiliateAccessTradeService from "../services/affiliateAccessTrade.service";
import { context } from "../types/context.type";

class AffiliateAccessTradeController {
    public affiliateAccessTradeService = new AffiliateAccessTradeService();

    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productsData = await this.affiliateAccessTradeService.getProducts();

            res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
            next(error);
        }
    };

    public getShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const param = req.query
            const productsData = await this.affiliateAccessTradeService.getShops();

            res.status(200).json({ data: productsData, message: 'Get all shops' });
        } catch (error) {
            next(error);
        }
    };

    public createShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body
            const productsData = await context.prisma.shop.create({ data: body });

            res.status(200).json({ data: productsData, message: 'Get all shops' });
        } catch (error) {
            next(error);
        }
    };

    public convertLinkShortShopee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { originUrl, subIds } = req.body

            const shortLink = await this.affiliateAccessTradeService.convertLinkShortShopee(originUrl, subIds)

            res.status(200).json({ data: shortLink, message: 'Convert short link successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default AffiliateAccessTradeController
import { Router } from "express";

import { Routes } from "../interfaces/routes.interface";

import AffiliateAccessTradeController from "../controllers/affiliateAccessTrade.controller";

class AffiliateAccessTradeRoute implements Routes {

    public path = '/feedData';
    public router = Router();
    public affiliateAccessTradeController = new AffiliateAccessTradeController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/products`, this.affiliateAccessTradeController.getProducts);
        this.router.get(`/shops`, this.affiliateAccessTradeController.getShops);
        this.router.post(`/shops`, this.affiliateAccessTradeController.createShop)
        this.router.post(`/shortLink`, this.affiliateAccessTradeController.convertLinkShortShopee)
    }
}

export default AffiliateAccessTradeRoute
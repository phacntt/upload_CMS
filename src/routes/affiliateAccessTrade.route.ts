import { Router } from "express";

import { Routes } from "../interfaces/routes.interface";

import AffiliateAccessTradeController from "../controllers/affiliateAccessTrade.controller";

class AffiliateAccessTradeRoute implements Routes {

    public path = '/extensions';
    public router = Router();
    public affiliateAccessTradeController = new AffiliateAccessTradeController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/products`, this.affiliateAccessTradeController.getProducts);
        this.router.get(`/shops`, this.affiliateAccessTradeController.getShops);
        this.router.post(`/redirect`, this.affiliateAccessTradeController.redirectProductURL);
        this.router.post(`/shops`, this.affiliateAccessTradeController.createShop);
        this.router.post(`/shortLink`, this.affiliateAccessTradeController.convertLinkShortShopee);
        // this.router.post(`/emailContact`, this.affiliateAccessTradeController.addEmailContact);
    }
}

export default AffiliateAccessTradeRoute
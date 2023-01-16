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
        this.router.get(`/campaigns`, this.affiliateAccessTradeController.getCampaigns);
        // this.router.post(`/`, this.feedDataController.createCategory);

    }
}

export default AffiliateAccessTradeRoute
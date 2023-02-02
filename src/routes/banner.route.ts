import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import BannerController from "../controllers/banner.controller";
import { createFileInS3 } from "../utils/createFileS3";

class BannerRoute implements Routes {

    public path = '/banners';
    public router = Router();
    public bannerController = new BannerController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.bannerController.getAllBanners);
        this.router.get(`/:id`, this.bannerController.getBannerById);
        this.router.post(`/s3`, authMiddleware, createFileInS3)
        this.router.post(`/`, authMiddleware, this.bannerController.createBanner);
        this.router.put(`/:id`, authMiddleware, this.bannerController.updateBanner);
        this.router.delete(`/:id`, authMiddleware, this.bannerController.deleteBanner);

    }
}

export default BannerRoute
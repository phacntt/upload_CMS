import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import BannerController from "../controllers/banner.controller";
import ContentController from "../controllers/content.controller";
import { createFileInS3 } from "../utils/createFileS3";

class ContentRoute implements Routes {

    public path = '/contents';
    public router = Router();
    public contentController = new ContentController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.contentController.getContents);
        this.router.get(`/:id`, this.contentController.getContentById);
        this.router.post(`/s3`, authMiddleware, createFileInS3)
        this.router.post(`/`, authMiddleware, this.contentController.createContent);
        this.router.put(`/:id`, authMiddleware, this.contentController.updateContent);
        this.router.delete(`/:id`, authMiddleware, this.contentController.deleteContent);

    }
}

export default ContentRoute
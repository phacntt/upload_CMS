import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import PageController from "../controllers/page.controller";

class PageRoute implements Routes {

    public path = '/pages';
    public router = Router();
    public pageController = new PageController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.pageController.getPages);
        this.router.get(`/:id`, this.pageController.getPageById);
        this.router.post(`/`, authMiddleware, this.pageController.createPage);
        this.router.put(`/:id`, authMiddleware, this.pageController.updatePage);
        this.router.delete(`/:id`, authMiddleware, this.pageController.deletePage);

    }
}

export default PageRoute
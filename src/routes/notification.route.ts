import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import NotificationController from "../controllers/notification.controller";

class NotificationRoute implements Routes {

    public path = '/notifications';
    public router = Router();
    public notificationController = new NotificationController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, authMiddleware, this.notificationController.listNotifications);
        this.router.get(`/:id`, authMiddleware, this.notificationController.notificationById);
        this.router.post(`/`, authMiddleware, this.notificationController.createNotification)
    }
}

export default NotificationRoute
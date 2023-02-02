import { Router } from "express";
import UserController from "../controllers/user.cotroller";
import authMiddleware from "../middlewares/auth.middleware";

class UserRoute {
    
    public path = '/users';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, authMiddleware, this.userController.getUsers);
        this.router.get(`/:id(\\d+)`,authMiddleware, this.userController.getUsersById);
        this.router.put(`/:id`, authMiddleware, this.userController.updateUser)
        this.router.put(`/role/:id`, this.userController.updateUserRole)
    }
}

export default UserRoute
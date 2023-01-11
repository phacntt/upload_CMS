import { Router } from "express";
import UserController from "../controllers/user.cotroller";

class UserRoute {
    
    public path = '/users';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`/`, this.userController.getUsers);
        this.router.get(`/:id(\\d+)`, this.userController.getUsersById);
        // this.router.post(``, this.userController.createUser);
    }
}

export default UserRoute
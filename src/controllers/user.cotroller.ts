import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { HttpException } from "../exception/HttpException";
import { isEmpty } from "../utils/isEmpty";
import { Prisma } from "@prisma/client";

class UserController {
    public userService = new UserService()

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData = await this.userService.getUsers();

            res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getUsersById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findAllUsersData = await this.userService.findUserById(userId);

            res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: Prisma.UserCreateInput = req.body
            console.log(data)
            if (isEmpty(data)) throw new HttpException(409, "Not found")
            const existsUser = await this.userService.findUserByEmail(data.email)
            if (existsUser) throw new HttpException(401, "You're email not found!! Please check again")
            const createUser = await this.userService.createUser(data)

            res.status(200).json({ data: createUser, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController
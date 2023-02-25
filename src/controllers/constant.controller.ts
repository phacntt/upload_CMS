import { Category, Constant, Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { HttpException } from "../exception/HttpException";
import { CreateCategoryDto } from "../dto/category.dto";
import ConstantService from "../services/constant.service";
import { CreateConstantDto } from "../dto/constant.dto";

class ConstantController {
    public constantService = new ConstantService();

    public getConstant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const constants: Constant[] = await this.constantService.getConstants();

            res.status(200).json({ data: constants, message: 'Get all constant' });
        } catch (error) {
            next(error);
        }
    };

    public createConstant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: CreateConstantDto = req.body;
            const newConstant = await this.constantService.createConstant(data)
            res.status(200).json({ data: newConstant, message: `Create constant ${newConstant.name} have value is ${newConstant.value} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public updateValueConstant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params;
            const existsConstant = await this.constantService.getConstantById(Number(id));
            if (!existsConstant) throw new HttpException(400, "Not found constant please check again!!!");

            const updateConstantInfo = req.body;
            const constantWasUpdate = await this.constantService.updateValueConstant(Number(id), updateConstantInfo);
            
            res.status(200).json({ data: constantWasUpdate, message: `Update constant was successfully` });
        } catch (error) {
            next(error)
        }
    };

}

export default ConstantController
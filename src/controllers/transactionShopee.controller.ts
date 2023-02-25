import { Category, Constant, Prisma, TransactionShopee } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { HttpException } from "../exception/HttpException";
import { CreateCategoryDto } from "../dto/category.dto";
import ConstantService from "../services/constant.service";
import { CreateConstantDto } from "../dto/constant.dto";
import TransactionShopeeService from "../services/transactionShopee.service";

class TransactionShopeeController {
    public transactionShopeeService = new TransactionShopeeService();

    public getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transactions: TransactionShopee[] = await this.transactionShopeeService.getTransactions();

            res.status(200).json({ data: transactions, message: 'Get all transaction' });
        } catch (error) {
            next(error);
        }
    };

    public createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: CreateConstantDto = req.body;
            const newTransactions = await this.transactionShopeeService.createTransaction(data)
            res.status(200).json({ data: newTransactions, message: `Create transaction successfully` });
        } catch (error) {
            next(error);
        }
    };
}

export default TransactionShopeeController
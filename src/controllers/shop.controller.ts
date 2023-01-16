import { Category, Prisma, Product, Shop, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import ShopService from "../services/shop.service";

class ShopController {
    public shopService = new ShopService();
    public categorySerivce = new CategoryService();

    public getShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const shopsData: Shop[] = await this.shopService.getShops();

            res.status(200).json({ data: shopsData, message: 'Get all shops' });
        } catch (error) {
            next(error);
        }
    };

    public getShopById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.query
            const shopById: Shop = await this.shopService.getShopById(Number(id)) as Shop;

            res.status(200).json({ data: shopById, message: `Get product have id = ${shopById.name} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public createShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreateShops = req.body

            const result = await Promise.all(dataCreateShops).then(resolve => resolve)
            const newProduct = await this.shopService.createShops(result);

            res.status(200).json({ data: newProduct, message: 'Create shops successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default ShopController
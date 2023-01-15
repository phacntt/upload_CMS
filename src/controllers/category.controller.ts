import { Category, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { HttpException } from "../exception/HttpException";

class CategoryController {
    public categoryService = new CategoryService();

    public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
            const categoriesData: Category[] = await this.categoryService.getCategories();

            res.status(200).json({ data: categoriesData, message: 'Get all category' });
        } catch (error) {
            next(error);
        }
    };

    public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.query
            const categoryById: Category = await this.categoryService.getCategoryById(Number(id)) as Category;

            res.status(200).json({ data: categoryById, message: `Get category ${categoryById.name} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreateCategories = req.body

            const newCategories: Category[] = await Promise.all(dataCreateCategories.map(async (category: Category) => {
                const existsCategory = await this.categoryService.getCategoryByName(category.name)
                if (!existsCategory) {
                    return category
                }
            })).then(resolve => resolve);
            const createNewCategories = await this.categoryService.createCategory(newCategories)
            
            res.status(200).json({ data: createNewCategories, message: 'Create categories successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default CategoryController
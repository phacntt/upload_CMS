import { Category, Prisma, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { HttpException } from "../exception/HttpException";

class CategoryController {
    public categoryService = new CategoryService();

    public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = req.query;
            const categoriesData: Category[] = await this.categoryService.getCategories(params);

            res.status(200).json({ data: categoriesData, message: 'Get all category' });
        } catch (error) {
            next(error);
        }
    };

    public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const params = req.query;
            if (!id) throw new HttpException(400, "Not found category!! Please check again....")

            const categoryById: Category = await this.categoryService.getCategoryById(Number(id), params) as Category;

            res.status(200).json({ data: categoryById, message: `Get category ${categoryById.name} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreateCategories = req.body

            // const newCategories: Category[] = await Promise.all(dataCreateCategories.map(async (category: Category) => {
            //     const existsCategory = await this.categoryService.getCategoryByName(category.name)
            //     if (!existsCategory) {
            //         return category
            //     }
            // })).then(resolve => resolve);
            const createNewCategories = await this.categoryService.createCategory(dataCreateCategories)
            
            res.status(200).json({ data: createNewCategories, message: 'Create categories successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log(400,
                      'Name category already exists. Please change name and do it again....'
                    )
                }
            }
            next(error)
        }
    };

}

export default CategoryController
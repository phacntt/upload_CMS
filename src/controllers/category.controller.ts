import { Category, Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import { HttpException } from "../exception/HttpException";
import { CreateCategoryDto } from "../dto/category.dto";

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
            const dataCreateCategories: CreateCategoryDto = req.body
            
            const existsCategory = await this.categoryService.getCategoryByName(dataCreateCategories.name)
            if (existsCategory) throw new HttpException(400, "Category already exists!!! Please change name again")

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
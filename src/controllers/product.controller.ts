import { Category, Product, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";

class ProductController {
    public productService = new ProductService();

    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const productsData: Product[] = await this.productService.getProducts();

        res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
        next(error);
        }
    };

    public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const { id } = req.query
        const ProductById: Product = await this.productService.getProductById(Number(id)) as Product;

        res.status(200).json({ data: ProductById, message: `Get product have id = ${ProductById.name} successfully` });
        } catch (error) {
        next(error);
        }
    };

    public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const dataCreateProducts = req.body
        const newProducts = await this.productService.createProducts(dataCreateProducts);

        res.status(200).json({ data: newProducts, message: 'create product successfully' });
        } catch (error) {
        next(error);
        }
    };

}

export default ProductController
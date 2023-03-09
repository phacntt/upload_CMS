import { Product } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import ProductService from "../services/product.service";
import { HttpException } from "../exception/HttpException";

class ProductController {
    public productService = new ProductService();

    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const queryParam = req.query
            const productsData: Product[] = await this.productService.getProducts(queryParam);

            res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
            next(error);
        }
    };

    public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            if (!id) throw new HttpException(400, "Not found product!! Please check again....")

            const ProductById: Product = await this.productService.getProductById(Number(id)) as Product;

            res.status(200).json({ data: ProductById, message: `Get product have id = ${ProductById.productName} successfully` });
        } catch (error) {
            next(error);
        }
    };

    

    public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreateProducts = req.body

            const newProduct = await this.productService.createProducts(dataCreateProducts);

            res.status(200).json({ data: newProduct, message: 'Create products successfully' });
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const existsProduct = this.productService.getProductById(Number(id))
            if (!existsProduct) throw new HttpException(400, "Not found product!!!!!")
            await this.productService.deleteProduct(Number(id));
            res.status(200).json({ message: "Delete product successfull" })
        } catch (error) {
            next(error)
        }
    }

}

export default ProductController
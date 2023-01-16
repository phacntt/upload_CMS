import { Category, Prisma, Product, User } from "@prisma/client";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
import { HttpException } from "../exception/HttpException";

class ProductController {
    public productService = new ProductService();
    public categorySerivce = new CategoryService();

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

            const listCategory = await this.categorySerivce.getCategories()

            const listProductCreate = dataCreateProducts.map(async (prod: any) => {
                // let categoryAdd: Category

                // const dataCreated = listCategory.find((category: Category) => {
                //     if (category?.name === prod.category_name) {
                //         categoryAdd = category
                //     }
                //     return categoryAdd
                // })
                const dataCreate = {
                    description: prod.desc,
                    image: prod.image,
                    linkAffilitate: prod.aff_link,
                    merchant: prod.merchant,
                    price: prod.price,
                    discountRate: prod.discount_rate,
                    linkProduct: prod.link,
                    name: prod.name,
                    discountAmount: prod.discount_amount,
                    discount: prod.discount
                }
                return dataCreate
            });

            const result = await Promise.all(listProductCreate).then(resolve => resolve)
            // console.log(result)
            // result.map( async(ele: any) => {
            //     const existsName = await this.productService.getProductByName(ele.name)
            //     if (existsName) throw new HttpException(400, `Product ${existsName.name} has already exists please check again`)
            //     return;
            // })
            const newProduct = await this.productService.createProducts(result);

            res.status(200).json({ data: newProduct, message: 'Create products successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default ProductController
import { Prisma, Product } from "@prisma/client";
import { context } from "../types/context.type";
import { HttpException } from "../exception/HttpException";

type ListProductsFilter = {
    page?: number;
    limit?: number;
}

class ProductService {
    public clients = context;
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 20;

    public async getProducts(filter?: ListProductsFilter) {
        const condition: ListProductsFilter = {};

        condition.limit = filter?.limit ? filter.limit : this.DEFAULT_LIMIT
        condition.page = filter?.page ? filter.page : this.DEFAULT_PAGE


        const products = await this.clients.prisma.product.findMany({skip: condition.page, take: condition.limit})
        return products;
    }

    public async getProductById(id: number) {
        const productById = await this.clients.prisma.product.findFirst({where: {id}})
        return productById;
    }

    public async getProductByName(name: string) {
        const productByName = await this.clients.prisma.product.findFirst({where: {name}})
        return productByName;
    }

    public async createProducts(productData: Product) {
        const newProducts = await this.clients.prisma.product.upsert({
            where: {productId: productData.productId},
            create: productData,
            update: productData
        })

        return newProducts
    }

    public async deleteProduct(id: number) {
        await this.clients.prisma.product.delete({where: { id }})
    }
    
}

export default ProductService
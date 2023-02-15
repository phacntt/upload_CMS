import { Prisma, Product } from "@prisma/client";
import { context } from "../types/context.type";
import { HttpException } from "../exception/HttpException";

type ListProductsFilter = {
    page?: number;
    limit?: number;
    sortBy?: SortBy;
}

type SortBy = {
    discount?: 'desc' | 'asc',
    discountRate?: 'desc' | 'asc',
    price?: 'desc' | 'asc',
    discountAmount?: 'desc' | 'asc'
}

class ProductService {
    public clients = context;
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 20;

    public async getProducts(filter?: ListProductsFilter) {
        const sortBy: SortBy = {}

        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            page = Number(filter.page);
        }

        if (filter?.limit) {
            limit = Number(filter.limit);
        }

        if (filter?.sortBy?.discount) {
            sortBy.discount = filter.sortBy?.discount
        }

        if (filter?.sortBy?.discountAmount) {
            sortBy.discountAmount = filter.sortBy?.discountAmount
        }

        if (filter?.sortBy?.discountRate) {
            sortBy.discountRate = filter.sortBy?.discountRate
        }

        if (filter?.sortBy?.price) {
            sortBy.price = filter.sortBy?.price
        }
        const products = await this.clients.prisma.product.findMany({skip: page == 1 ? page - 1 : (page - 1) * limit, take: limit, orderBy: sortBy})
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
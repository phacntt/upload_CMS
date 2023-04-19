import { Prisma, Product } from "@prisma/client";
import { context } from "../types/context.type";
import { HttpException } from "../exception/HttpException";
import { CreateProductDto } from "../dto/product.dto";
import { getCache, setCache } from "../utils/handleRedis";
import { pagination } from "../types/global.type";

type ListProductsFilter = {
    page?: number;
    limit?: number;
    sortBy?: SortBy;
    categoryId?: number;
}

type SortBy = {
    price?: 'desc' | 'asc',
    sales?: 'desc' | 'asc',
}


class ProductService {
    public clients = context;
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 20;

    public async getProducts(filter?: ListProductsFilter) {
        const sortBy: SortBy = {}
        let categoryId;

        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            page = Number(filter.page);
        }

        if (filter?.limit) {
            limit = Number(filter.limit);
        }

        if (filter?.sortBy?.sales) {
            sortBy.sales = filter.sortBy?.sales
        }

        if (filter?.sortBy?.price) {
            sortBy.price = filter.sortBy?.price
        }

        if (filter?.categoryId) {
            categoryId = Number(filter.categoryId)
        }
        const products = await this.clients.prisma.product.findMany({ skip: page == 1 ? page - 1 : (page - 1) * limit, take: limit, orderBy: { sales: sortBy.sales, price: sortBy.price }, where: { categoryId } })

        let totalProductCache = await getCache('total_product')

        if (!totalProductCache) {
            totalProductCache = await this.clients.prisma.product.count();
            await setCache('total_product', totalProductCache);
        }

        const pagination: pagination = {
            count: Number(totalProductCache),
            currentPage: page,
            perPage: limit,
            nextPage: Math.ceil(Number(totalProductCache) / limit) === page ? page : page + 1,
            totalPage: Math.ceil(Number(totalProductCache) / limit),
        }
        return { products, pagination };
    }

    public async getProductById(id: number) {
        const productById = await this.clients.prisma.product.findFirst({ where: { id } })
        return productById;
    }

    public async getProductByCategoryId(id: number) {
        const productByNameCategoryId = await this.clients.prisma.product.findFirst({ where: { categoryId: id } })
        return productByNameCategoryId;
    }

    public async getProductByName(name: string) {
        const productByName = await this.clients.prisma.product.findFirst({ where: { productName: name } })
        return productByName;
    }

    public async createProducts(productData: CreateProductDto) {
        return await this.clients.prisma.product.upsert({
            where: { itemId: productData.itemId },
            create: productData,
            update: productData
        })
    }

    public async deleteProduct(id: number) {
        await this.clients.prisma.product.delete({ where: { id } })
    }

}

export default ProductService
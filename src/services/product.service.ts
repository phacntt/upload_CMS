import { Product } from "@prisma/client";
import { context } from "../types/context.type";


class ProductService {
    public clients = context
    
    public async getProducts() {
        const products = await this.clients.prisma.product.findMany()
        return products;
    }

    public async getProductById(id: number) {
        const productById = await this.clients.prisma.product.findFirst({where: {id}})
        return productById;
    }

    public async createProducts(productData: Product[]) {
        const newProducts = await this.clients.prisma.category.createMany({data: productData})
        return newProducts
    }
    
}

export default ProductService
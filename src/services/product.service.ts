import { Prisma, Product } from "@prisma/client";
import { context } from "../types/context.type";


class ProductService {
    public clients = context
    
    public async getProducts() {
        const products = await this.clients.prisma.product.findMany({include: {category: true}})
        return products;
    }

    public async getProductById(id: number) {
        const productById = await this.clients.prisma.product.findFirst({where: {id}, include: {category: true}})
        return productById;
    }

    public async createProducts(productData: Product[]) {
        // const newProducts = await Promise.all(
        //     productData.map(async (prod) => {
        //         await this.clients.prisma.product.create({
        //             data: prod,
        //         })
        //     })
        // )

        const newProducts = await this.clients.prisma.product.createMany({data: productData})
    
        console.log(newProducts)

        return newProducts
    }
    
}

export default ProductService
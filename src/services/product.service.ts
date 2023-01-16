import { Prisma, Product } from "@prisma/client";
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

    public async getProductByName(name: string) {
        const productByName = await this.clients.prisma.product.findFirst({where: {name}})
        return productByName;
    }

    public async createProducts(productData: Product[]) {
        const newProducts = await Promise.all(
            productData.map(async (prod) => {
                await this.clients.prisma.product.create({
                    data: prod,
                })
            })
        )

    
        console.log(newProducts)

        return newProducts
    }
    
}

export default ProductService
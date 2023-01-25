import { Prisma, Product, Shop } from "@prisma/client";
import { context } from "../types/context.type";


class ShopService {
    public clients = context
    
    public async getShops() {
        const shops = await this.clients.prisma.shop.findMany()
        return shops;
    }

    public async getShopById(id: number) {
        const shopById = await this.clients.prisma.shop.findFirst({where: {id}, include: {category: true}})
        return shopById;
    }

    public async createShops(shopData: Shop[]) {
        const newShops = await this.clients.prisma.shop.createMany({data: shopData})


        return newShops
    }
    
}

export default ShopService
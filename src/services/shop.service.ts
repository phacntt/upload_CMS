import { Prisma, Product, Shop } from "@prisma/client";
import { context } from "../types/context.type";

type FilterShops = {
    page?: number,
    limit?: number,
    categoryId?: number,
}

class ShopService {
    public clients = context
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 5;

    public async getShops(filter?: FilterShops) {
        const condition: FilterShops = {}
        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            page = filter.page;
        }

        if (filter?.limit) {
            limit = filter.limit;
        }
        if (filter?.categoryId) {
            condition.categoryId = Number(filter.categoryId)
        }

        const shops = await this.clients.prisma.shop.findMany({skip: page == 1 ? page - 1 : (page - 1) * limit, take: limit, where: condition})
        return shops;
    }

    public async getShopById(id: number) {
        const shopById = await this.clients.prisma.shop.findFirst({where: {id}, include: {category: true}})
        return shopById;
    }

    public async createShops(shopData: Shop) {
        const newShop = await this.clients.prisma.shop.upsert({
            where: {campaignId: shopData.campaignId},
            create: shopData,
            update: shopData
        })
        
        return newShop
    }
    
}

export default ShopService
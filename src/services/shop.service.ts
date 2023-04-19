import { Prisma, Product, Shop } from "@prisma/client";
import { context } from "../types/context.type";
import { CreateShopDto } from "../dto/shop.dto";
import { getCache, setCache } from "../utils/handleRedis";
import { pagination } from "../types/global.type";

type FilterShops = {
    page?: number,
    limit?: number,
    categoryId?: number,
}

class ShopService {
    public clients = context
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 10;

    public async getShops(filter?: FilterShops) {
        const condition: FilterShops = {}
        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            page = Number(filter.page);
        }

        if (filter?.limit) {
            limit = Number(filter.limit);
        }
        if (filter?.categoryId) {
            condition.categoryId = Number(filter.categoryId)
        }

        const shops = await this.clients.prisma.shop.findMany({ skip: page == 1 ? page - 1 : (page - 1) * limit, take: limit, where: condition })
        
        let totalShopCache = await getCache('total_shop')

        if (!totalShopCache) {
            totalShopCache = await this.clients.prisma.shop.count();
            await setCache('total_shop', totalShopCache);
        }

        const pagination: pagination = {
            count: Number(totalShopCache),
            currentPage: page,
            perPage: limit,
            nextPage: Math.ceil(Number(totalShopCache) / limit) === page ? page : page + 1,
            totalPage: Math.ceil(Number(totalShopCache) / limit),
        }
        return { shops, pagination };
    }

    public async getShopById(id: number) {
        const shopById = await this.clients.prisma.shop.findFirst({ where: { id }, include: { category: true } })
        return shopById;
    }

    public async createShops(shopData: CreateShopDto) {
        return await this.clients.prisma.shop.upsert({
            create: shopData,
            update: shopData,
            where: { shopId: shopData.shopId }
        })
    }

}

export default ShopService
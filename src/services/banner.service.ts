import { Banner, Category } from "@prisma/client";
import { context } from "../types/context.type";

class BannerService {
    public clients = context
    
    public async getAllBanners() {
        const banners = await this.clients.prisma.banner.findMany()
        return banners;
    }

    public async getBannerById(id: number) {
        const bannerById = await this.clients.prisma.banner.findFirst({where: {id}})
        return bannerById;
    }

    public async createBanner(bannerData: Banner) {
        const newBanner = await this.clients.prisma.banner.create({data: bannerData})
        return newBanner
    }

    public async updateBanner(bannerData: Banner, id: number) {
        const newBanner = await this.clients.prisma.banner.update({where: { id }, data: bannerData})
        return newBanner
    }

    public async deleteBanner(id: number) {
        const bannerDelete = await this.clients.prisma.banner.delete({ where: { id }})
        return bannerDelete
    }
    
}

export default BannerService
import { Banner, BannerType, Page, StatusBanner } from "@prisma/client";
import { context } from "../types/context.type";
import { deleteObject } from "../utils/S3";

export type FilterBanner = {
    page?: number;
    limit?: number;
    pageId?: number;
    bannerType?:BannerType;
    status?: StatusBanner;
}

export type BannerDataCreate = {
    image: string;
    landingPageUrl: string;
    airTimeCreate: Date;
    airTimeEnd: Date;
    pageId: number;
    bannerPosition: number,
    bannerType: BannerType,
}

class BannerService {
    public clients = context
    public DEFAULT_PAGE = 0;
    public DEFAULT_LIMIT = 10;

    public async getAllBanners(filter?: FilterBanner) {
        const condition: FilterBanner = {};
        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            page = filter.page;
        }

        if (filter?.limit) {
            limit = filter.limit;
        }

        if (filter?.pageId) {
            condition.pageId = Number(filter.pageId);
        }

        if (filter?.bannerType) {
            condition.bannerType = filter.bannerType;
        }

        if (filter?.status) {
            condition.status = filter.status as StatusBanner;
        }

        const banners = await this.clients.prisma.banner.findMany({take: limit, skip: page, where: condition as any})
        
        return banners;
    }

    public async checkBannerCamping(page: number, type: BannerType, position: number, airTimeCreate: Date) {
        return await this.clients.prisma.banner.findFirst({where: {pageId: page, AND: {bannerPosition: position, bannerType: type}, OR: {airTimeCreate: airTimeCreate}}})
    }

    public async getBannerById(id: number) {
        const bannerById = await this.clients.prisma.banner.findFirst({where: {id}})
        return bannerById;
    }

    public async createBanner(bannerData: BannerDataCreate) {
        const newBanner = await this.clients.prisma.banner.create({data: bannerData})
        return newBanner
    }

    public async updateBanner(bannerData: Banner, id: number) {
        const newBanner = await this.clients.prisma.banner.update({where: { id }, data: bannerData})
        return newBanner
    }

    public async deleteBanner(id: number, keyImage: string) {
        const bannerDelete = await this.clients.prisma.$transaction(async(tx) => {
            await deleteObject(keyImage!)
            await this.clients.prisma.banner.delete({where: {id}})
        })
        return bannerDelete
    }
    
}

export default BannerService
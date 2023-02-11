import { context } from "../types/context.type";
import { CreateContentDto } from "../dto/content.dto";
import { deleteObject } from "../utils/S3";
import { String40 } from "aws-sdk/clients/sagemaker";

export type FilterContent = {
    page?: number;
    limit?: number;
    pageId?: string;
    categoryId?: string;
}

class ContentService {
    public clients = context
    public DEFAULT_PAGE = 0;
    public DEFAULT_LIMIT = 10;

    public async getContents(filter?: FilterContent) {
        const condition: any = {};
        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            condition.page = filter.page
        }

        if (filter?.limit) {
            condition.limit = filter.limit
        }
        
        if (filter?.pageId) {
            condition.pageId = Number(filter.pageId)
        }

        if (filter?.categoryId) {
            condition.categoryId = Number(filter.categoryId)
        }

        const contents = await this.clients.prisma.content.findMany({take: limit, skip: page, where: condition as any, include: {category: true, page: true} })

        return contents;
    }

    public async getContentById(id: number) {
        const contentById = await this.clients.prisma.content.findFirst({where: {id}})
        return contentById;
    }

    public async getContentByTitle(title: string) {
        const contentByTitle = await this.clients.prisma.content.findFirst({where: {title}})
        return contentByTitle
    }

    public async createContent(contentData: CreateContentDto) {
        const newContent = await this.clients.prisma.content.create({data: contentData})
        return newContent
    }

    public async updateContent(contentData: CreateContentDto, id: number) {
        const newContent = await this.clients.prisma.content.update({where: { id }, data: contentData})
        return newContent
    }

    public async deleteContent(id: number, keyImage: string) {
        const ContentDelete = await this.clients.prisma.$transaction(async() => {
            await deleteObject(keyImage!)
            await this.clients.prisma.content.delete({where: {id}})
        })
        return ContentDelete
    }
    
}

export default ContentService
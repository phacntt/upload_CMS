import { Content } from "@prisma/client";
import { context } from "../types/context.type";
import { CreateContentDto } from "../dto/content.dto";

export type FilterContent = {
    page?: number;
    limit?: number;
    categorylv1?: string
}

class ContentService {
    public clients = context
    public DEFAULT_PAGE = 0;
    public DEFAULT_LIMIT = 10;

    public async getContents(filter?: FilterContent) {
        const condition: FilterContent = {};
        let page = this.DEFAULT_PAGE;
        let limit = this.DEFAULT_LIMIT;

        if (filter?.page) {
            condition.page = filter.page
        }

        if (filter?.limit) {
            condition.limit = filter.limit
        }
        
        if (filter?.categorylv1) {
            condition.categorylv1 = filter.categorylv1
        }

        const contents = await this.clients.prisma.content.findMany({take: limit, skip: page, where: condition})
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

    public async updateContent(contentData: Content, id: number) {
        const newContent = await this.clients.prisma.content.update({where: { id }, data: contentData})
        return newContent
    }

    public async deleteContent(id: number) {
        const ContentDelete = await this.clients.prisma.content.delete({ where: { id }})
        return ContentDelete
    }
    
}

export default ContentService
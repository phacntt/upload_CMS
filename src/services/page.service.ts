import { Page } from "@prisma/client";
import { CreatePageDto } from "../dto/page.dto";
import { context } from "../types/context.type";
import { deleteObject } from "../utils/S3";

export type Filterpage = {
    page?: number;
    limit?: number;
    pagepage?: string
}

class PageService {
    public clients = context
    public DEFAULT_PAGE = 0;
    public DEFAULT_LIMIT = 10;

    public async getPages() {
        // const condition: any = {};
        // let page = this.DEFAULT_PAGE;
        // let limit = this.DEFAULT_LIMIT;

        // if (filter?.page) {
        //     condition.page = filter.page
        // }

        // if (filter?.limit) {
        //     condition.limit = filter.limit
        // }
        
        // if (filter?.pagepage) {
        //     condition.categorylv1 = filter.pagepage
        // }

        const pages = await this.clients.prisma.page.findMany()

        return pages;
    }

    public getPageById(id: number) {
        return this.clients.prisma.page.findFirst({where: {id}});
    }

    public getPageByName(name: string) {
        return this.clients.prisma.page.findFirst({where: {name}})
    }

    public createPage(pageData: CreatePageDto) {
        return this.clients.prisma.page.create({data: pageData});
    }

    public updatePage(pageData: Page, id: number) {
        return this.clients.prisma.page.update({where: { id }, data: pageData})
    }

    public deletePage(id: number) {
        return this.clients.prisma.page.delete({where: {id}})
    }
    
}

export default PageService
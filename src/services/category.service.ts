import { context } from "../types/context.type";
import { CreateCategoryDto } from "../dto/category.dto";

export type FilterCategory = {
    shops?: boolean,
    pages?: boolean,
    contents?: boolean,
}

type QueryParam = {
    page?: number
    includes?: FilterCategory
}

class CategoryService {
    public clients = context
    public getCondition(params?: FilterCategory) {
        const condition: FilterCategory = {};

        if (params?.pages) {
            condition.pages = params.pages;
        }

        if (params?.shops) {
            condition.shops = params.shops;
        }

        if (params?.contents) {
            condition.contents = params.contents;
        }
        console.log(condition)

        if (Object.keys(condition).length != 0) {
            return condition;
        }
        return undefined;

    }

    public getCategories(params?: any) {
        const condition = this.getCondition(params);
        return this.clients.prisma.category.findMany({where: {pageId: params.pageId ? Number(params.pageId) : undefined}, include: condition});
    }

    public getCategoryById(id: number, params?: any) {
        const condition = this.getCondition(params)
        return this.clients.prisma.category.findFirst({where: {id}, include: condition});
    }
    
    public getCategoryByName(name: string, params?: any) {
        const condition = this.getCondition(params)
        return this.clients.prisma.category.findFirst({where: {name}, include: condition});
    }

    public async createCategory(categoryData: CreateCategoryDto) {
        return this.clients.prisma.category.create({data: categoryData})
    }
    
    public updateCategory(id: number, categoryData: CreateCategoryDto) {
        return this.clients.prisma.category.update({where: {id}, data: categoryData})
    }

    public deleteAllCategory() {
        return this.clients.prisma.category.deleteMany({})
    }

    public deleteCategoryById(id: number) {
        return this.clients.prisma.category.delete({where: {id}})
    }
}

export default CategoryService
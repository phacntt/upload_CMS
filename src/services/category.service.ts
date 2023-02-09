import { context } from "../types/context.type";
import { CreateCategoryDto } from "../dto/category.dto";

export type FilterCategory = {
    shops?: boolean,
    banners?: boolean,
    contents?: boolean
}

class CategoryService {
    public clients = context
    public getCondition(params?: FilterCategory) {
        const condition: FilterCategory = {};

        if (params?.banners) {
            condition.banners = params.banners;
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

    public getCategories(params?: FilterCategory) {
        const condition = this.getCondition(params);
        return this.clients.prisma.category.findMany({include: condition});
    }

    public getCategoryById(id: number, params?: FilterCategory) {
        const condition = this.getCondition(params)
        return this.clients.prisma.category.findFirst({where: {id}, include: condition});
    }
    
    public getCategoryByName(name: string, params?: FilterCategory) {
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
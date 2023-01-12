import { Category } from "@prisma/client";
import { context } from "../types/context.type";

class CategoryService {
    public clients = context
    
    public async getCategories() {
        const categories = await this.clients.prisma.category.findMany()
        return categories;
    }

    public async getCategoryById(id: number) {
        const categoryById = await this.clients.prisma.category.findFirst({where: {id}})
        return categoryById;
    }
    
    public async getCategoryByName(name: string, merchant: string) {
        const categoryByName = await this.clients.prisma.category.findFirst({where: {name, merchant}})
        return categoryByName;
    }

    public async createCategory(categoryData: Category[]) {
        const newCategory = await this.clients.prisma.category.createMany({data: categoryData, skipDuplicates: true})
        return newCategory
    }
    
}

export default CategoryService
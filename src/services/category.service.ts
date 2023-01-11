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

    public async createCategory(categoryData: Category[]) {
        const newCategory = await this.clients.prisma.category.createMany({data: categoryData})
        return newCategory
    }
    
}

export default CategoryService
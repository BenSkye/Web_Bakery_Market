import { categoryModel } from "../models/category.model";


class CategoryRepo {
    async createCategory(data: any) {
        return await categoryModel.create(data);
    }
    async updateCategory(id: string, data: any) {
        return await categoryModel.findByIdAndUpdate(id, data, { new: true });
    }
    async getCategoriesById(id: string) {
        return await categoryModel.findById(id);
    }

}

export default new CategoryRepo();
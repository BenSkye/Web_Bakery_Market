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
    async getListCategory() {
        return await categoryModel.find({ status: 'active' });
    }

}

export default new CategoryRepo();
import categoryRepo from "../repositories/category.repo";


class CategoryService {
    static createCategory = async (data: any) => {
        return await categoryRepo.createCategory(data);
    }
    static activeCategory = async (id: string) => {
        return await categoryRepo.updateCategory(id, { status: 'active' });
    }
}
export default CategoryService;
import { productModel } from "../models/product.model";
import { getSelectData } from "../utils";

class ProductRepository {
    async createProduct(product: any) {
        return await productModel.create(product);
    }

    async getProducts(query: any, fields: string[]) {
        return await productModel.find(query)
            .select(getSelectData(fields))
            .populate([
                { path: 'category', select: 'name _id' },
                { path: 'bakery', select: 'name _id' }
            ]).lean();;
    }

    async getProductById(id: string, fields: string[]) {
        return await productModel.findById(id).select(getSelectData(fields)).populate([{
            path: 'category',
            select: 'name _id'
        }, {
            path: 'bakery',
            select: 'name _id'
        }]).lean();
    }

    // async updateProduct(id: number, product: Product): Promise<[number, Product[]]> {
    //     return await Product.update(product, { where: { id } });
    // }

    // async deleteProduct(id: number): Promise<number> {
    //     return await Product.destroy({ where: { id } });
    // }
}

export default new ProductRepository();
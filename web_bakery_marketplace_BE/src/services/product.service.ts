import { NotFoundError } from "../core/error.response";
import { userModel } from "../models/user.model";
import bakeryRepo from "../repositories/bakery.repo";
import categoryRepo from "../repositories/category.repo";
import inventoryRepo from "../repositories/inventory.repo";
import productRepo from "../repositories/product.repo";

class ProductService {
    static createProduct = async (data: any, user_id: any) => {
        const user = await userModel.findById(user_id);
        if (!user) {
            throw new NotFoundError('No user found');
        }
        const bakeryId = data.bakery;
        const categoryId = data.category;
        const bakery = await bakeryRepo.getBakeryById(bakeryId, []);
        console.log('user_id:', user_id);
        console.log('bakery.user_id:', bakery?.user_id);
        if (!bakery) {
            throw new NotFoundError('No bakery found');
        }
        if (bakery.user_id.toString !== user_id.toString) {
            throw new NotFoundError('User is not authorized to create product for this bakery');
        }
        const category = categoryRepo.getCategoriesById(categoryId);
        if (!category) {
            throw new NotFoundError('No category found');
        }
        const newProduct = await productRepo.createProduct(data);
        if (newProduct) {
            const inventory = await inventoryRepo.createInventory({
                product_id: newProduct._id,
                shop_id: bakeryId,
                stock: 0,
            })
        }
        return newProduct;
    }

    static getProducts = async () => {
        const select = ['name', 'bakery', 'category', 'price', 'status', 'image', 'rating'];
        const query = { status: "available" }
        const products = await productRepo.getProducts(query, select);
        return products;
    }

    static getProductById = async (id: string) => {
        const select = ['name', 'bakery', 'category', 'price', 'status', 'image', 'rating', 'description', 'ingredients'];
        const product = await productRepo.getProductById(id, select);
        if (!product) {
            throw new NotFoundError('No product found');
        }
        return product;
    }

    static getProductsByBakery = async (bakeryId: string) => {
        const select = ['name', 'bakery', 'category', 'price', 'status', 'image', 'rating'];
        const bakery = await bakeryRepo.getBakeryById(bakeryId, []);
        if (!bakery) {
            throw new NotFoundError('No bakery found');
        }
        const query = { bakery: bakeryId }
        const products = await productRepo.getProducts(query, select);
        return products;
    }
}

export default ProductService;
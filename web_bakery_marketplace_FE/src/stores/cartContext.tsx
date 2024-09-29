import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../services/apiClient';

interface CartItem {
    id: string;
    name: string;
    cart_products: Array<{
        product_id: {
            _id: string;
            name: string;
            price: number;
            thumbnail: string;
        },
        quantity: number;
    }>;
    cart_count_products: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const respone = await apiClient.get('/cart/get-cart');
                console.log(respone.data.metadata)
                setCart(respone.data.metadata);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCart();
    }, []);

    const addToCart = async (productData: {
        product_id: string,
        quantity: number,
    }) => {
        console.log('productData', productData)
        const response = await apiClient.post('/cart/add-to-cart', { productData });
        console.log(response.data.metadata);
        setCart(response.data.metadata);
    };

    const removeFromCart = async (productId: string) => {
        console.log('productData', productId)
        const response = await apiClient.delete(`/cart/remove/${productId}`);
        console.log(response.data.metadata);
        setCart(response.data.metadata);
    };

    // const clearCart = () => {
    //     setCart([]);
    // };
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}
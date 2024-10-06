import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

interface CartProduct {
    product_id: {
        _id: string,
        name: string,
        price: number,
        thumbnail: string,
    },
    quantity: number,
}

interface CartItem {
    id: string,
    name: string,
    cart_products: CartProduct[],
    cart_count_products: number,
}

interface CartContextType {
    cart: CartItem | null;
    isLoading: boolean;
    error: string | null;
    addToCart: (productData: { product_id: string, quantity: number }) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    fetchCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        console.log('cart1', cart)
        try {
            const response = await apiClient.get('/cart/get-cart');
            console.log('response', response.data.metadata)
            setCart(response.data.metadata);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to fetch cart. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        console.log('cart2', cart)
    }, [cart])

    const addToCart = async (productData: { product_id: string, quantity: number }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/cart/add-to-cart', { productData });
            setCart(response.data.metadata);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Failed to add item to cart. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (productId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.delete(`/cart/remove/${productId}`);
            setCart(response.data.metadata);
        } catch (error) {
            console.error('Error removing from cart:', error);
            setError('Failed to remove item from cart. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cart, isLoading, error, addToCart, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
}
export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    }[];
}

export type newCart = Omit<Cart, "id">;
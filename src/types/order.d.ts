interface IOrder {
    products: Record<string | number>[]
}

interface IDataOrder {
    _id?: string;
    products?: Record<string, number>[];
    userId?: string;
    status?: string;
    total?: number;
    shippingAddress?: Record<string, string[]>;
    createdAt?: string;
    orderId?: string;
}

interface IProductsInOrder {
    productId: Record<string, unknown>,
    name: string;
    price: number;
    quantity: number;
    _id: string
}


interface IOrderResponse {
    _id?: string;
    products?: IProductsInOrder[];
    orderId?: string;
    userId?: string;
    status?: string;
    total?: number;
    shippingAddress?: {
        name?: string;
        phone?: string;
        address?: string;
        coordinate?: string[]
    };
    updatedAt?: string;
    createdAt?: string;
}

export type {IOrder, IDataOrder, IProductsInOrder, IOrderResponse};
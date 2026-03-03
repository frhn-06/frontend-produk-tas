interface ICart {
    _id?: string;
    productId?: {
        _id?: string;
        name?: string;
        price?: number;
        image?: string;
    }
    quantity?: number;
}

interface ICartForm {
    productId: string;
}

export type {ICart, ICartForm}
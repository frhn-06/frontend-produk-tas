interface IReview {
    _id?: string;
    productId?: string;
    userId?: {
        _id?: string;
        userName?: string;
        profilePicture?: string;
    };
    comment?: string;
    stars?: number;
    createdAt?: string;
}

export type {IReview}
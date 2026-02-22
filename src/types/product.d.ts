interface IProduct {
    _id?: string;
    name?: string;
    slug?: string;
    description?: string;
    categoryId?: string;
    price?: number | string;
    quantity?: number | string;
    discount?: number | string;
    image?: string | FileList;
    images?: string[] | FileList;
    isFeatured?: string;
    isPublish?: string;
    isDeleted?: string;
    starsAgr?: number;
    totalComment?: number;
    activities?: string[];
    target?: string;
}



export {IProduct}
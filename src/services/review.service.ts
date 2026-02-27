import instance from "@/libs/axios";
import { IReview } from "@/types/review";
import endpoint from "./endpoint,constant";

const ReviewService = {
    create: (payload: IReview) => instance.post(`${endpoint.REVIEW}`, payload),

    getByProduct: (productId: string) => instance.get(`${endpoint.REVIEW}/${productId}`),

    delete: (id: string) => instance.get(`${endpoint.REVIEW}/${id}`),
}

export default ReviewService;
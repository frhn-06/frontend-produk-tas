import ReviewService from "@/services/review.service";
import { useQuery } from "@tanstack/react-query";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/router";

const useProduct = (productId: string) => {
    const router = useRouter();

    const getReviews = async () => {
        const {data} = await ReviewService.getByProduct(productId);
        return data;
    }

    const {data: dataReviews, isLoading: isLoadingRevies, refetch: refetchReviews, isRefetching: isRefetchingReviews} = useQuery({
        queryKey: ["Reviews"],
        queryFn: getReviews,
        enabled: !!productId && router.isReady
    })
    
    return {
        dataReviews,
        isLoadingRevies,
        refetchReviews,
        isRefetchingReviews
    }
}

export default useProduct;
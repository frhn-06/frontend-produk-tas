import CategoryService from "@/services/category.service"
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"

const usePageProductsByCategory = () => {
    const router = useRouter();
    const getCategory = async () => {
        const {data} = await CategoryService.findById(`${router.query.id}`);
        return data;
    }

    const {data: dataCategory} = useQuery({
        queryKey: ["PageCategory"],
        queryFn: getCategory,
        enabled: !!router.query.id && router.isReady
    })

    return {
        dataCategory
    }
}

export default usePageProductsByCategory;
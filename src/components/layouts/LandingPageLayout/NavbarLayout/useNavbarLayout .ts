import ActivityService from "@/services/activity.service";
import CartService from "@/services/cart.service";
import { ICart } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import  useDebaunce from '@/hooks/debaunce';
import { ChangeEvent, useState } from "react";
import ProductService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";

const useNavbarLayout = () => {
     const router = useRouter();

    const session = useSession();

    const [search, setSearch] = useState("");

    const {debaunce} = useDebaunce();

    const getActivities = async() => {
    
        const {data} = await ActivityService.findAll();
        return data;
    }
    
    const {data:dataActivities, isLoading:isLoadingActivities } = useQuery({
        queryKey: ["ActivityNav"],
        queryFn: getActivities,
        enabled: router.isReady
    });


    

    const getProductsBySearch = async() => {
        const params = `search=${search}&limit${LIMIT_DEFAULT}&page=${PAGE_DEFAULT}&publish=${true}`
        const {data} = await ProductService.findAll(params);
        return data;   
    }

    const {data: dataProductsSearch, isLoading:isLoadingProductsSearch} = useQuery({
        queryKey: ["ProductSearch", search],
        queryFn: getProductsBySearch,
        enabled: !!search
    })


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debaunce(() => {
            setSearch(e.target.value);
        }, 800)
    }



    return {
        dataActivities,
        isLoadingActivities,
    
        dataProductsSearch,
        isLoadingProductsSearch,
        handleSearch,
        search
    }
    
}

export default useNavbarLayout;
"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import ProductsByCategory from "@/components/views/ProductsByCategory";
import usePageProductsByCategory from "../../../hooks/usePageProductsByCategory";

const PageProductsByCategory = () => {

    const {
        dataCategory
    } = usePageProductsByCategory();
    return (
        <ProductPageLayout title={`${dataCategory?.data?.name} | Category` || ""}>
            <ProductsByCategory />
        </ProductPageLayout>
     
    )
}

export default PageProductsByCategory;
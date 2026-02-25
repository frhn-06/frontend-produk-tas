"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import ProductsByActivity from "@/components/views/ProductsByActivity";
import usePageProductsByActivity from "../../../hooks/usePageProductsByActivity";

const PageProductsByActivity = () => {
    const {
        dataActivity
    } = usePageProductsByActivity();
  
    return (
        <ProductPageLayout title={`${dataActivity?.data?.name} | Activity` || ""}>
                <ProductsByActivity />
        </ProductPageLayout>
     
    )
}

export default PageProductsByActivity;
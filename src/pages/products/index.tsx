"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import Products from "@/components/views/Products";

const PageProducts = () => {
    return (
        <ProductPageLayout title="Products | Velaro">
            <Products />
        </ProductPageLayout>
        
    )
}

export default PageProducts;